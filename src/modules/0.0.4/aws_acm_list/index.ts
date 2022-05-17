import { AWS, } from '../../../services/gateways/aws'
import { Context, Crud, Mapper, Module, } from '../../interfaces'
import { Certificate } from './entity'
import * as metadata from './module.json'

export const AwsAcmListModule: Module = new Module({
  ...metadata,
  utils: {
    certificateMapper: (e: any) => {
      const out = new Certificate();
      if (!e?.CertificateArn) throw new Error('No CertificateArn defined');
      out.arn = e.CertificateArn;
      out.certificateId = e.CertificateArn.split('/').pop();
      out.certificateType = e.Type;
      out.domainName = e.DomainName;
      out.inUse = !!e.InUseBy?.length;
      out.renewalEligibility = e.RenewalEligibility;
      out.status = e.Status;
      return out;
    },
  },
  mappers: {
    certificate: new Mapper<Certificate>({
      entity: Certificate,
      entityId: (e: Certificate) => e.arn ?? e.id.toString(),
      equals: (a: Certificate, b: Certificate) => Object.is(a.certificateId, b.certificateId) &&
        Object.is(a.certificateType, b.certificateType) &&
        Object.is(a.domainName, b.domainName) &&
        Object.is(a.inUse, b.inUse) &&
        Object.is(a.renewalEligibility, b.renewalEligibility) &&
        Object.is(a.status, b.status),
      source: 'db',
      cloud: new Crud({
        create: async (es: Certificate[], ctx: Context) => {
          // Do not cloud create, just restore database
          await AwsAcmListModule.mappers.certificate.db.delete(es, ctx);
        },
        read: async (ctx: Context, ids?: string[]) => {
          const client = await ctx.getAwsClient() as AWS;
          let out = [];
          if (Array.isArray(ids)) {
            for (const id of ids) {
              out.push(await client.getCertificate(id));
            }
          } else {
            out = (await client.getCertificates()) ?? [];
          }
          return out.map(AwsAcmListModule.utils.certificateMapper);
        },
        updateOrReplace: () => 'update',
        update: async (es: Certificate[], ctx: Context) => {
          // Right now we can only modify AWS-generated fields in the database.
          // This implies that on `update`s we only have to restore the values for those records.
          const out = [];
          for (const e of es) {
            const cloudRecord = ctx?.memo?.cloud?.Certificate?.[e.arn ?? ''];
            cloudRecord.id = e.id;
            await AwsAcmListModule.mappers.certificate.db.update(cloudRecord, ctx);
            out.push(cloudRecord);
          }
          return out;
        },
        delete: async (es: Certificate[], ctx: Context) => {
          const client = await ctx.getAwsClient() as AWS;
          for (const e of es) {
            await client.deleteCertificate(e.arn ?? '');
          }
        },
      }),
    }),
  },
}, __dirname);