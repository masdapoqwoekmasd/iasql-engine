"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9236],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=s(n),f=a,m=d["".concat(c,".").concat(f)]||d[f]||u[f]||i;return n?r.createElement(m,o(o({ref:t},p),{},{components:n})):r.createElement(m,o({ref:t},p))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7093:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return c},default:function(){return f},frontMatter:function(){return l},metadata:function(){return s},toc:function(){return u}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],l={sidebar_position:1,slug:"/vpc"},c="AWS VPC",s={unversionedId:"sample-queries/aws_vpc",id:"version-0.0.18/sample-queries/aws_vpc",title:"AWS VPC",description:"Create a VPC and a subnet within it",source:"@site/versioned_docs/version-0.0.18/sample-queries/aws_vpc.md",sourceDirName:"sample-queries",slug:"/vpc",permalink:"/0.0.18/vpc",draft:!1,tags:[],version:"0.0.18",sidebarPosition:1,frontMatter:{sidebar_position:1,slug:"/vpc"},sidebar:"tutorialSidebar",previous:{title:"Getting Started",permalink:"/0.0.18/"},next:{title:"AWS Security Group",permalink:"/0.0.18/aws_security_group"}},p={},u=[{value:"Create a VPC and a subnet within it",id:"create-a-vpc-and-a-subnet-within-it",level:2}],d={toc:u};function f(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"aws-vpc"},"AWS VPC"),(0,i.kt)("h2",{id:"create-a-vpc-and-a-subnet-within-it"},"Create a VPC and a subnet within it"),(0,i.kt)("p",null,"Install the AWS virtual private cloud (VPC) module"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT * FROM iasql_install('aws_vpc');\n")),(0,i.kt)("p",null,"Create an isolated VPC in which to create resources via the ",(0,i.kt)("a",{parentName:"p",href:"https://dbdocs.io/iasql/iasql?table=vpc&schema=public&view=table_structure"},(0,i.kt)("inlineCode",{parentName:"a"},"vpc"))," table. Read more about VPC ",(0,i.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/vpc/latest/userguide/configure-your-vpc.html"},"here"),". To create a VPC, specify a range of IPv4 addresses for the VPC in the form of a Classless Inter-Domain Routing (CIDR) block."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"INSERT INTO vpc (cidr_block)\nVALUES ('192.168.0.0/16');\n")),(0,i.kt)("p",null,"Now ",(0,i.kt)("inlineCode",{parentName:"p"},"apply")," the VPC change to your cloud account"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT * FROM iasql_apply();\n")),(0,i.kt)("p",null,"A VPC spans all of the Availability Zones in an AWS Region. After you create a VPC, you can add one or more subnets in each Availability Zone. The snippet below creates a non-default subnet in one of the availability zones within the newly created VPC"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"INSERT INTO subnet (availability_zone, vpc_id, cidr_block)\nSELECT (select * from availability_zone limit 1), id, '192.168.0.0/16'\nFROM vpc\nWHERE is_default = false\nAND cidr_block = '192.168.0.0/16';\n")),(0,i.kt)("button",{className:"button button--primary button--lg margin-bottom--lg",onClick:function(){return window.open("https://app.iasql.com/#/button/SELECT%20%2A%20FROM%20iasql_install%28%27aws_vpc%27%29%3B%0A%0AINSERT%20INTO%20vpc%20%28cidr_block%29%0AVALUES%20%28%27192.168.0.0%2F16%27%29%3B%0A%0ASELECT%20%2A%20FROM%20iasql_apply%28%29%3B%0A%0AINSERT%20INTO%20subnet%20%28availability_zone%2C%20vpc_id%2C%20cidr_block%29%0ASELECT%20%28select%20%2A%20from%20availability_zone%20limit%201%29%2C%20id%2C%20%27192.168.0.0%2F16%27%0AFROM%20vpc%0AWHERE%20is_default%20%3D%20false%0AAND%20cidr_block%20%3D%20%27192.168.0.0%2F16%27%3B%0A%0ASELECT%20%2A%20FROM%20iasql_apply%28%29%3B","_blank")}},"Run SQL"))}f.isMDXComponent=!0}}]);