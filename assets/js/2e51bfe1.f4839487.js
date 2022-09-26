"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5668],{3905:function(e,r,t){t.d(r,{Zo:function(){return c},kt:function(){return m}});var o=t(7294);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function u(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function a(e,r){if(null==e)return{};var t,o,n=function(e,r){if(null==e)return{};var t,o,n={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var s=o.createContext({}),p=function(e){var r=o.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):u(u({},r),e)),t},c=function(e){var r=p(e.components);return o.createElement(s.Provider,{value:r},e.children)},l={inlineCode:"code",wrapper:function(e){var r=e.children;return o.createElement(o.Fragment,{},r)}},g=o.forwardRef((function(e,r){var t=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),g=p(t),m=n,y=g["".concat(s,".").concat(m)]||g[m]||l[m]||i;return t?o.createElement(y,u(u({ref:r},c),{},{components:t})):o.createElement(y,u({ref:r},c))}));function m(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var i=t.length,u=new Array(i);u[0]=g;var a={};for(var s in r)hasOwnProperty.call(r,s)&&(a[s]=r[s]);a.originalType=e,a.mdxType="string"==typeof e?e:n,u[1]=a;for(var p=2;p<i;p++)u[p]=t[p];return o.createElement.apply(null,u)}return o.createElement.apply(null,t)}g.displayName="MDXCreateElement"},5721:function(e,r,t){t.r(r),t.d(r,{assets:function(){return c},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return a},metadata:function(){return p},toc:function(){return l}});var o=t(7462),n=t(3366),i=(t(7294),t(3905)),u=["components"],a={sidebar_position:2,slug:"/aws_security_group"},s="AWS Security Group",p={unversionedId:"sample-queries/aws_security_group",id:"version-0.0.15/sample-queries/aws_security_group",title:"AWS Security Group",description:"Create a security group",source:"@site/versioned_docs/version-0.0.15/sample-queries/aws_security_group.md",sourceDirName:"sample-queries",slug:"/aws_security_group",permalink:"/0.0.15/aws_security_group",draft:!1,tags:[],version:"0.0.15",sidebarPosition:2,frontMatter:{sidebar_position:2,slug:"/aws_security_group"},sidebar:"tutorialSidebar",previous:{title:"AWS VPC",permalink:"/0.0.15/vpc"},next:{title:"AWS IAM",permalink:"/0.0.15/aws_iam"}},c={},l=[{value:"Create a security group",id:"create-a-security-group",level:2}],g={toc:l};function m(e){var r=e.components,t=(0,n.Z)(e,u);return(0,i.kt)("wrapper",(0,o.Z)({},g,t,{components:r,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"aws-security-group"},"AWS Security Group"),(0,i.kt)("h2",{id:"create-a-security-group"},"Create a security group"),(0,i.kt)("p",null,"Install the AWS security group module"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT * FROM iasql_install('aws_security_group');\n")),(0,i.kt)("p",null,"An AWS ",(0,i.kt)("inlineCode",{parentName:"p"},"security_group")," controls the traffic that is allowed to reach and leave the cloud resources that it is associated with via ",(0,i.kt)("inlineCode",{parentName:"p"},"security_group_rules"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"INSERT INTO security_group (description, group_name)\nVALUES ('Security Group from IaSQL sample', 'iasql-sample-sg');\n")),(0,i.kt)("p",null,"Now create two security group rules to allow SSH (port 22) and HTTPS (port 443) and associate them with the security group created above using a foreign key relationship. Read more about security group rule configuration ",(0,i.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#SecurityGroupRules"},"here")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"INSERT INTO security_group_rule (is_egress, ip_protocol, from_port, to_port, cidr_ipv4, description, security_group_id)\nSELECT true, 'tcp', 443, 443, '0.0.0.0/8', 'iasqlsamplerule', id\nFROM security_group\nWHERE group_name = 'iasql-sample-sg';\n\nINSERT INTO security_group_rule (is_egress, ip_protocol, from_port, to_port, cidr_ipv6, description, security_group_id)\nSELECT false, 'tcp', 22, 22, '::/8', 'iasqlsamplerule2', id\nFROM security_group\nWHERE group_name = 'iasql-sample-sg';\n")),(0,i.kt)("button",{className:"button button--primary button--lg margin-bottom--lg",onClick:function(){return window.open("https://app.iasql.com/#/button/SELECT%20%2A%20FROM%20iasql_install%28%27aws_security_group%27%29%3B%0A%0AINSERT%20INTO%20security_group%20%28description%2C%20group_name%29%0AVALUES%20%28%27Security%20Group%20from%20IaSQL%20sample%27%2C%20%27iasql-sample-sg%27%29%3B%0A%0AINSERT%20INTO%20security_group_rule%20%28is_egress%2C%20ip_protocol%2C%20from_port%2C%20to_port%2C%20cidr_ipv4%2C%20description%2C%20security_group_id%29%0ASELECT%20true%2C%20%27tcp%27%2C%20443%2C%20443%2C%20%270.0.0.0%2F8%27%2C%20%27iasqlsamplerule%27%2C%20id%0AFROM%20security_group%0AWHERE%20group_name%20%3D%20%27iasql-sample-sg%27%3B%0A%0AINSERT%20INTO%20security_group_rule%20%28is_egress%2C%20ip_protocol%2C%20from_port%2C%20to_port%2C%20cidr_ipv6%2C%20description%2C%20security_group_id%29%0ASELECT%20false%2C%20%27tcp%27%2C%2022%2C%2022%2C%20%27%3A%3A%2F8%27%2C%20%27iasqlsamplerule2%27%2C%20id%0AFROM%20security_group%0AWHERE%20group_name%20%3D%20%27iasql-sample-sg%27%3B%0A%0ASELECT%20%2A%20FROM%20iasql_apply%28%29%3B","_blank")}},"Run SQL"))}m.isMDXComponent=!0}}]);