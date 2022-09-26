"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7162],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=a.createContext({}),l=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=l(e.components);return a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,u=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=l(n),f=r,h=p["".concat(u,".").concat(f)]||p[f]||d[f]||o;return n?a.createElement(h,i(i({ref:t},c),{},{components:n})):a.createElement(h,i({ref:t},c))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=p;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},9390:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return u},default:function(){return f},frontMatter:function(){return s},metadata:function(){return l},toc:function(){return d}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),i=["components"],s={sidebar_position:1,slug:"/"},u="Getting Started",l={unversionedId:"getting-started",id:"getting-started",title:"Getting Started",description:"IaSQL is an open-source SaaS to manage cloud infrastructure using an unmodified PostgreSQL database by maintaining a 2-way connection between the hosted database and your AWS account. The rows in the database tables represent the infrastructure in your cloud account. Our dashboard provisions a PostgreSQL database for you and configures it to manage an AWS account and region. The database is automatically backfilled with all your existing cloud resources. Which tables are loaded into an IaSQL database is configured based on what IaSQL modules are installed in a db. Every IaSQL module represents a cloud service like awsec2 or awselb. Once the desired modules are installed with the install IaSQL PostgreSQL function, run INSERT or UPDATE queries on the database by using the PG connection string displayed when you first set up in the dashboard with your preferred PostgreSQL client. Finally, run the iasql_apply PostgreSQL function to provision infrastructure in your cloud account based on the IaSQL db.",source:"@site/docs/getting-started.md",sourceDirName:".",slug:"/",permalink:"/next/",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,slug:"/"},sidebar:"tutorialSidebar",next:{title:"AWS VPC",permalink:"/next/vpc"}},c={},d=[{value:"What part of the documentation should I look at?",id:"what-part-of-the-documentation-should-i-look-at",level:2}],p={toc:d};function f(e){var t=e.components,n=(0,r.Z)(e,i);return(0,o.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"getting-started"},"Getting Started"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://iasql.com"},"IaSQL")," is an open-source SaaS to manage cloud infrastructure using an unmodified PostgreSQL database by maintaining a 2-way connection between the hosted database and your AWS account. The rows in the database tables represent the infrastructure in your cloud account. Our ",(0,o.kt)("a",{parentName:"p",href:"https://app.iasql.com"},"dashboard")," provisions a PostgreSQL database for you and configures it to manage an AWS account and region. The database is automatically backfilled with all your existing cloud resources. Which tables are loaded into an ",(0,o.kt)("a",{parentName:"p",href:"/next/database"},"IaSQL database")," is configured based on what ",(0,o.kt)("a",{parentName:"p",href:"/next/module"},"IaSQL modules")," are installed in a db. Every IaSQL module represents a cloud service like ",(0,o.kt)("inlineCode",{parentName:"p"},"aws_ec2")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"aws_elb"),". Once the desired modules are installed with the ",(0,o.kt)("inlineCode",{parentName:"p"},"install")," ",(0,o.kt)("a",{parentName:"p",href:"/next/function"},"IaSQL PostgreSQL function"),", run ",(0,o.kt)("inlineCode",{parentName:"p"},"INSERT")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"UPDATE")," queries on the database by using the PG connection string displayed when you first set up in the dashboard with your preferred ","[PostgreSQL client]","(/How-to Guides/connect.md). Finally, run the ",(0,o.kt)("inlineCode",{parentName:"p"},"iasql_apply")," PostgreSQL function to provision infrastructure in your cloud account based on the IaSQL db."),(0,o.kt)("h2",{id:"what-part-of-the-documentation-should-i-look-at"},"What part of the documentation should I look at?"),(0,o.kt)("p",null,"A high-level overview of how the IaSQL documentation is organized will help you know how to quickly find what you are looking for:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("a",{parentName:"li",href:"/next/sql"},"tutorials")," will guide you from 0 to an HTTP server to your AWS account using ECS, ECR, RDS and ELB using IaSQL. Start here if you\u2019re new to IaSQL."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/next/connect"},"How-to guides")," are recipes. They guide you through the steps involved in addressing key problems and use-cases. They are more advanced than the quickstart and assume some knowledge of how IaSQL works."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/next/database"},"Concepts")," provides useful background and describes at a fairly high level the internals of how IaSQL works."),(0,o.kt)("li",{parentName:"ul"},"Technical ",(0,o.kt)("a",{parentName:"li",href:"/next/function"},"reference")," for built-in APIs. They describe how it works and how to use it but assume some knowledge of how IaSQL works.")))}f.isMDXComponent=!0}}]);