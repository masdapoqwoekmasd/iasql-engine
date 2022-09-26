"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2097],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return d}});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=a.createContext({}),o=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=o(e.components);return a.createElement(l.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),m=o(t),d=r,E=m["".concat(l,".").concat(d)]||m[d]||p[d]||i;return t?a.createElement(E,s(s({ref:n},u),{},{components:t})):a.createElement(E,s({ref:n},u))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,s=new Array(i);s[0]=m;var c={};for(var l in n)hasOwnProperty.call(n,l)&&(c[l]=n[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,s[1]=c;for(var o=2;o<i;o++)s[o]=t[o];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},7760:function(e,n,t){t.r(n),t.d(n,{assets:function(){return u},contentTitle:function(){return l},default:function(){return d},frontMatter:function(){return c},metadata:function(){return o},toc:function(){return p}});var a=t(7462),r=t(3366),i=(t(7294),t(3905)),s=["components"],c={sidebar_position:4,slug:"/aws_ec2"},l="AWS EC2",o={unversionedId:"sample-queries/aws_ec2",id:"version-0.0.18/sample-queries/aws_ec2",title:"AWS EC2",description:"Create and update instances",source:"@site/versioned_docs/version-0.0.18/sample-queries/aws_ec2.md",sourceDirName:"sample-queries",slug:"/aws_ec2",permalink:"/0.0.18/aws_ec2",draft:!1,tags:[],version:"0.0.18",sidebarPosition:4,frontMatter:{sidebar_position:4,slug:"/aws_ec2"},sidebar:"tutorialSidebar",previous:{title:"AWS IAM",permalink:"/0.0.18/aws_iam"},next:{title:"AWS RDS",permalink:"/0.0.18/aws_rds"}},u={},p=[{value:"Create and update instances",id:"create-and-update-instances",level:2},{value:"Read-only instance metadata",id:"read-only-instance-metadata",level:2}],m={toc:p};function d(e){var n=e.components,t=(0,r.Z)(e,s);return(0,i.kt)("wrapper",(0,a.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"aws-ec2"},"AWS EC2"),(0,i.kt)("h2",{id:"create-and-update-instances"},"Create and update instances"),(0,i.kt)("p",null,"Install the AWS EC2 module"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT * FROM iasql_install('aws_ec2');\n")),(0,i.kt)("p",null,"Create two new EC2 instances associated with the ",(0,i.kt)("inlineCode",{parentName:"p"},"default")," security group within a transaction. A instance ",(0,i.kt)("inlineCode",{parentName:"p"},"name")," tag is required. ",(0,i.kt)("inlineCode",{parentName:"p"},"resolve:ssm:/aws/service/canonical/ubuntu/server/20.04/stable/current/amd64/hvm/ebs-gp2/ami-id")," resolves to the AMI ID for Ubuntu in the corresponding AWS region."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"INSERT INTO instance (ami, instance_type, tags)\n  VALUES ('resolve:ssm:/aws/service/canonical/ubuntu/server/20.04/stable/current/amd64/hvm/ebs-gp2/ami-id', 't2.micro', '{\"name\":\"i-1\"}');\nINSERT INTO instance_security_groups (instance_id, security_group_id) SELECT\n  (SELECT id FROM instance WHERE tags ->> 'name' = 'i-1'),\n  (SELECT id FROM security_group WHERE group_name='default');\n\nINSERT INTO instance (ami, instance_type, tags)\n  VALUES ('resolve:ssm:/aws/service/canonical/ubuntu/server/20.04/stable/current/amd64/hvm/ebs-gp2/ami-id', 't2.micro', '{\"name\":\"i-2\"}');\nINSERT INTO instance_security_groups (instance_id, security_group_id) SELECT\n  (SELECT id FROM instance WHERE tags ->> 'name' = 'i-2'),\n  (SELECT id FROM security_group WHERE group_name='default');\n")),(0,i.kt)("button",{className:"button button--primary button--lg margin-bottom--lg",onClick:function(){return window.open("https://app.iasql.com/#/button/INSERT%20INTO%20instance%20%28ami%2C%20instance_type%2C%20tags%29%0A%20%20VALUES%20%28%27resolve%3Assm%3A%2Faws%2Fservice%2Fcanonical%2Fubuntu%2Fserver%2F20.04%2Fstable%2Fcurrent%2Famd64%2Fhvm%2Febs-gp2%2Fami-id%27%2C%20%27t2.micro%27%2C%20%27%7B%22name%22%3A%22i-1%22%7D%27%29%3B%0AINSERT%20INTO%20instance_security_groups%20%28instance_id%2C%20security_group_id%29%20SELECT%0A%20%20%28SELECT%20id%20FROM%20instance%20WHERE%20tags%20-%3E%3E%20%27name%27%20%3D%20%27i-1%27%29%2C%0A%20%20%28SELECT%20id%20FROM%20security_group%20WHERE%20group_name%3D%27default%27%29%3B%0A%0AINSERT%20INTO%20instance%20%28ami%2C%20instance_type%2C%20tags%29%0A%20%20VALUES%20%28%27resolve%3Assm%3A%2Faws%2Fservice%2Fcanonical%2Fubuntu%2Fserver%2F20.04%2Fstable%2Fcurrent%2Famd64%2Fhvm%2Febs-gp2%2Fami-id%27%2C%20%27t2.micro%27%2C%20%27%7B%22name%22%3A%22i-2%22%7D%27%29%3B%0AINSERT%20INTO%20instance_security_groups%20%28instance_id%2C%20security_group_id%29%20SELECT%0A%20%20%28SELECT%20id%20FROM%20instance%20WHERE%20tags%20-%3E%3E%20%27name%27%20%3D%20%27i-2%27%29%2C%0A%20%20%28SELECT%20id%20FROM%20security_group%20WHERE%20group_name%3D%27default%27%29%3B","_blank")}},"Run SQL"),(0,i.kt)("p",null,"Apply changes"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT * FROM iasql_apply();\n")),(0,i.kt)("p",null,"Query newly created instances. View the table schema ",(0,i.kt)("a",{parentName:"p",href:"https://dbdocs.io/iasql/iasql?table=instance&schema=public&view=table_structure"},"here")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT *\nFROM instance\nWHERE tags ->> 'name' = 'i-1' OR\ntags ->> 'name' = 'i-2';\n")),(0,i.kt)("p",null,"Get an instance count"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT COUNT(*)\nFROM instance;\n")),(0,i.kt)("p",null,"Change the instance to the AWS Linux AMI for the previously created ",(0,i.kt)("inlineCode",{parentName:"p"},"i-1")," instance. This will trigger a recreate so the existing instance will be terminated and a new one will be created when ",(0,i.kt)("inlineCode",{parentName:"p"},"iasql_apply")," is called."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"UPDATE instance SET ami = 'resolve:ssm:/aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2' WHERE tags ->> 'name' = 'i-1';\nSELECT * FROM iasql_apply();\n")),(0,i.kt)("h2",{id:"read-only-instance-metadata"},"Read-only instance metadata"),(0,i.kt)("p",null,"Install the AWS EC2 module"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT * FROM iasql_install('aws_ec2_metadata');\n")),(0,i.kt)("p",null,"View the metadata for the previously created ",(0,i.kt)("inlineCode",{parentName:"p"},"i-1")," instance. View the table schema ",(0,i.kt)("a",{parentName:"p",href:"https://dbdocs.io/iasql/iasql?table=instance_metadata&schema=public&view=table_structure"},"here")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT *\nFROM instance_metadata\nWHERE instance_id = (\n  SELECT instance_id\n  FROM instance\n  WHERE tags ->> 'name' = 'i-1'\n);\n")))}d.isMDXComponent=!0}}]);