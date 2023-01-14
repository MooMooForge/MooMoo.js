"use strict";(self.webpackChunknotes=self.webpackChunknotes||[]).push([[942],{3905:(e,t,a)=>{a.d(t,{Zo:()=>y,kt:()=>g});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var i=r.createContext({}),c=function(e){var t=r.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},y=function(e){var t=c(e.components);return r.createElement(i.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,y=s(e,["components","mdxType","originalType","parentName"]),p=c(a),m=n,g=p["".concat(i,".").concat(m)]||p[m]||u[m]||o;return a?r.createElement(g,l(l({ref:t},y),{},{components:a})):r.createElement(g,l({ref:t},y))}));function g(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,l=new Array(o);l[0]=m;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[p]="string"==typeof e?e:n,l[1]=s;for(var c=2;c<o;c++)l[c]=a[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},5808:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=a(7462),n=(a(7294),a(3905));const o={sidebar_position:2},l=void 0,s={unversionedId:"Managers/ActivePlayers",id:"Managers/ActivePlayers",title:"ActivePlayers",description:"ActivePlayers Manager",source:"@site/docs/Managers/ActivePlayers.md",sourceDirName:"Managers",slug:"/Managers/ActivePlayers",permalink:"/MooMoo.js/Managers/ActivePlayers",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/MooMoo.js/Managers/Introduction"},next:{title:"GamePlayers",permalink:"/MooMoo.js/Managers/GamePlayers"}},i={},c=[{value:"ActivePlayers Manager",id:"activeplayers-manager",level:2},{value:"getting other data",id:"getting-other-data",level:3}],y={toc:c};function p(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},y,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"activeplayers-manager"},"ActivePlayers Manager"),(0,n.kt)("p",null,"The ActivePlayers Manager is a component of MooMoo.js that provides information about the players currently being rendered in the game. This includes details such as their session ID (sid), name, position, and other relevant information."),(0,n.kt)("p",null,"You can access the ActivePlayers Manager and retrieve information about the players like this:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},"let activePlayerManager = MooMoo.ActivePlayerManager;\nlet players = activePlayerManager.players;\n")),(0,n.kt)("p",null,"The ",(0,n.kt)("inlineCode",{parentName:"p"},"players")," property will contain an array of player objects with the following structure:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},'{\n    players: [\n        {\n         "sid": 4,\n         "name": "unknown",\n         "id": "5TapKvA56N",\n         "x": 5951,\n         "y": 8207,\n         "dir": -2.65\n        }\n    ]   \n}\n')),(0,n.kt)("p",null,"Note that the player objects contain much more information than what is shown here. To learn more about the available data and methods in the Player object, you can check out the ",(0,n.kt)("a",{parentName:"p",href:"/MooMoo.js/Player"},"Player")," page."),(0,n.kt)("p",null,"The Manager also provides you functions to search for certain players."),(0,n.kt)("p",null,"If you want to search for a player by SID, you can do that like this:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},"let player = MooMoo.ActivePlayerManager.getPlayerBySid(sid)\n")),(0,n.kt)("p",null,"You can also get a player by its ID:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},"let player = MooMoo.ActivePlayerManager.getPlayerById(id)\n")),(0,n.kt)("p",null,"You can also get a player / players by their name:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},"let player = MooMoo.ActivePlayerManager.getPlayerByName(name)\n")),(0,n.kt)("p",null,"If there are more than one player with the same name, this method will return an array of players. Otherwise, it will return a single player object."),(0,n.kt)("h3",{id:"getting-other-data"},"getting other data"),(0,n.kt)("p",null,"The ActivePlayers Manager also provides you with a way to get information about the enemies and / or all players around you."),(0,n.kt)("p",null,"Here are all the methods that are available:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},"let activePlayerManager = MooMoo.ActivePlayerManager;\n\nlet enemies = activePlayerManager.getEnemies();\n// returns an array of enemies\n\nlet teammates = activePlayerManager.getTeammates();\n// returns an array of teammates\n\nlet nearestEnemy = activePlayerManager.getClosestEnemy();\n// returns the nearest enemy\n\nlet nearestTeammate = activePlayerManager.getClosestTeammate();\n// returns the nearest teammate\n\nlet nearestPlayer = activePlayerManager.getClosestPlayer();\n// returns the nearest player\n\nlet nearestplayertoplayer = activePlayerManager.getClosestEnemyToPlayer(player);\n// this function takes in a player object and returns the nearest enemy to that player\n\nlet nearestEnemyAngle = activePlayerManager.getClosestEnemyAngle();\n// returns the angle to the nearest enemy\n\nlet nearestEnemyDistance = activePlayerManager.getClosestEnemyDistance();\n// returns the distance to the nearest enemy\n")))}p.isMDXComponent=!0}}]);