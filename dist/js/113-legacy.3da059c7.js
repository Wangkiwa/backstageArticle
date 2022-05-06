"use strict";(self["webpackChunkblog_vue"]=self["webpackChunkblog_vue"]||[]).push([[113],{32113:function(e,t,r){r.r(t),r.d(t,{default:function(){return u}});var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ArticleSend-container"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/welcome"}}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("文章管理")]),a("el-breadcrumb-item",[e._v("文章发布")])],1),a("el-card",[a("el-form",{ref:"sendformRef",attrs:{model:e.pubForm,"label-width":"80px",rules:e.sendformRed}},[a("el-form-item",{attrs:{label:"文章标题",prop:"title"}},[a("el-input",{attrs:{placeholder:"请输入文章标题"},model:{value:e.pubForm.title,callback:function(t){e.$set(e.pubForm,"title",t)},expression:"pubForm.title"}})],1),a("el-form-item",{attrs:{label:"文章分类",prop:"cate_id"}},[a("el-select",{attrs:{placeholder:"请选择分类",clearable:""},model:{value:e.pubForm.cate_id,callback:function(t){e.$set(e.pubForm,"cate_id",t)},expression:"pubForm.cate_id"}},e._l(e.options,(function(e){return a("el-option",{key:e.Id,attrs:{label:e.name,value:e.Id}})})),1)],1),a("el-form-item",{attrs:{label:"文章内容"}},[a("quill-editor",{ref:"editorRef",staticClass:"editor",model:{value:e.pubForm.content,callback:function(t){e.$set(e.pubForm,"content",t)},expression:"pubForm.content"}})],1),a("el-form-item",{staticClass:"img-item",attrs:{label:"文章封面",prop:"cover_img"}},[e.preview?a("img",{ref:"imgRef",staticClass:"cover-img",attrs:{src:e.preview,alt:""}}):a("img",{ref:"imgRef",staticClass:"cover-img",attrs:{src:r(57581),alt:""}}),a("br"),a("input",{ref:"iptFile",staticStyle:{display:"none"},attrs:{type:"file",accept:"image/*"},on:{change:e.onCoverChange}}),a("el-button",{attrs:{type:"text"},on:{click:function(t){return e.$refs.iptFile.click()}}},[e._v("+ 选择封面")])],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.pubArt("已发布")}}},[e._v("发布")]),a("el-button",{attrs:{type:"info"},on:{click:function(t){return e.pubArt("草稿")}}},[e._v("存为草稿")])],1)],1)],1)],1)},i=[],n=r(16198),o=(r(41539),r(54747),r(47941),r(78783),r(33948),r(60285),r(41637),r(78975),{data:function(){return{preview:"",content:"",options:[],cate_id:"",pubForm:{title:"",cate_id:"",content:"",cover_img:"",state:""},sendformRed:{title:[{required:!0,message:"请输入文章标题",trigger:"blur"},{min:1,max:30,message:"文章标题的长度为1-30个字符",trigger:"blur"}],cate_id:[{required:!0,message:"请选择文章分类",trigger:"blur"}],cover_img:[{required:!0,message:"请选择文章封面",trigger:"change"}]}}},created:function(){this.getArticleCate()},methods:{getArticleCate:function(){var e=this;return(0,n.Z)(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("/my/article/cates");case 2:r=t.sent,a=r.data,e.options=a.data;case 5:case"end":return t.stop()}}),t)})))()},pubArt:function(e){var t=this;this.pubForm.state=e,this.$refs.sendformRef.validate(function(){var e=(0,n.Z)(regeneratorRuntime.mark((function e(r){var a,i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r){e.next=2;break}return e.abrupt("return",t.$message.error("请填写完整信息"));case 2:return a=new FormData,Object.keys(t.pubForm).forEach((function(e){return a.append(e,t.pubForm[e])})),e.next=6,t.$http.post("/my/article/add",a,{headers:{"Content-Type":"multipart/form-data"}});case 6:if(i=e.sent,n=i.data,0===n.status){e.next=10;break}return e.abrupt("return",t.$message.error("发布文章失败！"));case 10:"已发布"===t.pubForm.state?(t.$message.success("发布文章成功!"),console.log(t.pubForm),t.preview="",t.$refs.sendformRef.resetFields()):(t.$message.info("已存为草稿!"),t.preview="",t.$refs.sendformRef.resetFields());case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},onCoverChange:function(e){var t=e.target.files[0];console.log(t),t?(this.preview=URL.createObjectURL(t),console.log(this.preview),this.pubForm.cover_img=t):(this.preview="",this.pubForm.cover_img="")}}}),s=o,c=r(1001),l=(0,c.Z)(s,a,i,!1,null,"2da1a8e7",null),u=l.exports},57581:function(e,t,r){e.exports=r.p+"img/cover.54bfb07c.jpg"}}]);
//# sourceMappingURL=113-legacy.3da059c7.js.map