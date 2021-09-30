
// TODO refactor to a class
export function findDiff(dbEntities: any[], cloudEntities: any[], id: string) {
  const entitiesInDbOnly: any[] = [];
  const entitiesInAwsOnly: any[] = [];
  const dbEntityIds = dbEntities.map(e => e[id]);
  const cloudEntityIds = cloudEntities.map(e => e[id]);
  // Everything in cloud and not in db is a potential delete
  const cloudEntNotInDb = cloudEntities.filter(e => !dbEntityIds.includes(e[id]));
  cloudEntNotInDb.map(e => entitiesInAwsOnly.push(e));
  // Everything in db and not in cloud is a potential create
  const dbEntNotInCloud = dbEntities.filter(e => !cloudEntityIds.includes(e[id]));
  dbEntNotInCloud.map(e => entitiesInDbOnly.push(e));
  // Everything else needs a diff between them
  const remainingDbEntities = dbEntities.filter(e => cloudEntityIds.includes(e[id]));
  const entitiesDiff: any[] = [];
  remainingDbEntities.map(dbEnt => {
    const cloudEntToCompare = cloudEntities.find(e => e[id] === dbEnt[id]);
    entitiesDiff.push(diff(dbEnt, cloudEntToCompare));
  });
  return {
    entitiesInDbOnly,
    entitiesInAwsOnly,
    entitiesDiff
  }
}

function diff(dbObj: any, cloudObj: any) {
  if (isValue(dbObj) || isValue(cloudObj)) {
    return {
      type: compare(dbObj, cloudObj),
      db: dbObj,
      cloud: cloudObj
    };
  }
  let diffObj: any = {};
  for (let key in dbObj) {
    // Ignore database internal primary key
    if (key === 'id') {
      continue;
    }
    let cloudVal = cloudObj[key];
    diffObj[key] = diff(dbObj[key], cloudVal);
  }
  for (var key in cloudObj) {
    if (key === 'id' || diffObj[key] !== undefined) {
      continue;
    }
    diffObj[key] = diff(undefined, cloudObj[key]);
  }
  return diffObj;
}

function isValue(o: any) {
  return !isObject(o) && !isArray(o);
}

function isObject(o: any) {
  return typeof o === 'object' && o !== null && !Array.isArray(o);
}

function isArray(o: any) {
  return Array.isArray(o);
}

function isDate(o: any) {
  return o instanceof Date;
}

function compare(dbVal: any, cloudVal: any) {
  if (dbVal === cloudVal) {
    return 'unchanged'
  }
  if (isDate(dbVal) && isDate(cloudVal) && dbVal.getTime() === cloudVal.getTime()) {
    return 'unchanged'
  }
  return `to update ${cloudVal} with ${dbVal}`
}

