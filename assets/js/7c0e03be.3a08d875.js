"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2920],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=c(n),m=o,f=p["".concat(l,".").concat(m)]||p[m]||d[m]||a;return n?r.createElement(f,s(s({ref:t},u),{},{components:n})):r.createElement(f,s({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=p;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:o,s[1]=i;for(var c=2;c<a;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},2912:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return i},metadata:function(){return c},toc:function(){return d}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),s=["components"],i={sidebar_position:7,slug:"/aws_route53"},l="AWS Route53 Hosted Zones",c={unversionedId:"sample-queries/aws_route53",id:"version-0.0.20/sample-queries/aws_route53",title:"AWS Route53 Hosted Zones",description:"Install the AWS Route53 module for hosted zones. Read more about AWS Route53 hosted zones here.",source:"@site/versioned_docs/version-0.0.20/sample-queries/aws_route53.md",sourceDirName:"sample-queries",slug:"/aws_route53",permalink:"/aws_route53",draft:!1,tags:[],version:"0.0.20",sidebarPosition:7,frontMatter:{sidebar_position:7,slug:"/aws_route53"},sidebar:"tutorialSidebar",previous:{title:"AWS Elastic Container Registry",permalink:"/aws_ecr"},next:{title:"Manage an AWS Account",permalink:"/aws"}},u={},d=[{value:"Create a hosted zone",id:"create-a-hosted-zone",level:2},{value:"Check default record sets have been added",id:"check-default-record-sets-have-been-added",level:2}],p={toc:d};function m(e){var t=e.components,n=(0,o.Z)(e,s);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"aws-route53-hosted-zones"},"AWS Route53 Hosted Zones"),(0,a.kt)("p",null,"Install the AWS Route53 module for hosted zones. Read more about AWS Route53 hosted zones ",(0,a.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html"},"here"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT * FROM iasql_install('aws_route53_hosted_zones');\n")),(0,a.kt)("h2",{id:"create-a-hosted-zone"},"Create a hosted zone"),(0,a.kt)("p",null,"Create a hosted zone and new record within it. Finally, ",(0,a.kt)("inlineCode",{parentName:"p"},"apply")," it."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"INSERT INTO hosted_zone (domain_name)\nVALUES ('iasqlsample.com');\n\nINSERT INTO resource_record_set (name, record_type, record, ttl, parent_hosted_zone_id)\nSELECT 'test.iasqlsample.com', 'CNAME', 'example.com.', 300, id\nFROM hosted_zone\nWHERE domain_name = 'iasqlsample.com';\n\nSELECT * FROM iasql_apply();\n")),(0,a.kt)("button",{className:"button button--primary button--lg margin-bottom--lg",onClick:function(){return window.open("https://app.iasql.com/#/button/INSERT%20INTO%20hosted_zone%20%28domain_name%29%0AVALUES%20%28%27iasqlsample.com%27%29%3B%0A%0AINSERT%20INTO%20resource_record_set%20%28name%2C%20record_type%2C%20record%2C%20ttl%2C%20parent_hosted_zone_id%29%0ASELECT%20%27test.iasqlsample.com%27%2C%20%27CNAME%27%2C%20%27example.com.%27%2C%20300%2C%20id%0AFROM%20hosted_zone%0AWHERE%20domain_name%20%3D%20%27iasqlsample.com%27%3B%0A%0ASELECT%20%2A%20FROM%20iasql_apply%28%29%3B","_blank")}},"Run SQL"),(0,a.kt)("h2",{id:"check-default-record-sets-have-been-added"},"Check default record sets have been added"),(0,a.kt)("p",null,"Join over the ",(0,a.kt)("a",{parentName:"p",href:"https://dbdocs.io/iasql/iasql?table=hosted_zone&schema=public&view=table_structure"},(0,a.kt)("inlineCode",{parentName:"a"},"hosted_zone"))," and ",(0,a.kt)("a",{parentName:"p",href:"https://dbdocs.io/iasql/iasql?table=resource_record_set&schema=public&view=table_structure"},(0,a.kt)("inlineCode",{parentName:"a"},"resource_record_set"))," tables."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT *\nFROM resource_record_set\nINNER JOIN hosted_zone ON hosted_zone.id = parent_hosted_zone_id\nWHERE domain_name = 'iasqlsample.com';\n")),(0,a.kt)("button",{className:"button button--primary button--lg margin-bottom--lg",onClick:function(){return window.open("https://app.iasql.com/#/button/SELECT%20%2A%0AFROM%20resource_record_set%0AINNER%20JOIN%20hosted_zone%20ON%20hosted_zone.id%20%3D%20parent_hosted_zone_id%0AWHERE%20domain_name%20%3D%20%27iasqlsample.com%27%3B","_blank")}},"Run SQL"))}m.isMDXComponent=!0}}]);