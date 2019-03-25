
var PageYytjImport = function(){
    return {
        defaultOption: {
            basePath:"",
            dataYytjGrid : null,
            statusList:[{id:10, text:"上传成功"},{id:20, text:"处理成功"},{id:30, text:"处理失败"}]
        },
        init :function ()
        {
            mini.parse();
            this.basePath = PageMain.basePath;
            this.dataYytjGrid = mini.get("dataYytjGrid");
            this.dataYytjGrid.setUrl(PageMain.defaultOption.httpUrl + "/fileImportStatus/getList");
            this.funSearch();
            //上传附件
            $('.upload-file').change(function () {
                PageYytjImport.funImageAjaxSubmit($(this), "", "details_add");
            });
        },
        funSearch : function()
        {
            var yytjSearchForm = new mini.Form("yytjSearchForm");
            this.dataYytjGrid.load(yytjSearchForm.getData());
        },
        funReset : function()
        {
            var yytjSearchForm = new mini.Form("yytjSearchForm");
            yytjSearchForm.setData();
            mini.get("bizType").setValue("1");
            mini.get("queryParamFlag").setValue("1");
            this.dataYytjGrid.load(yytjSearchForm.getData());
        },
        funRendererStatus : function (e)
        {
            for(var nItem = 0; nItem < PageYytjImport.defaultOption.statusList.length; nItem++)
            {
                if(e.value == PageYytjImport.defaultOption.statusList[nItem].id)
                {
                    return PageYytjImport.defaultOption.statusList[nItem].text;
                }
            }
            return "";
        },
        funRendererCreated : function(e)
        {
            return PageMain.funStrToDate(e.row.created);
        },
        funRendererTip : function (e)
        {
           if (e.row.status != '30') {
               return '';
           }
        },

        /**
         * 文件上传
         * @param $this jquery对象
         * @param id 缩略图ID
         * @param flag 自定义回调渲染
         */
        funImageAjaxSubmit: function($this,id,flag) {
            var that = this;
            $this.upload({
                url: PageMain.defaultOption.httpUrl + '/file/uploadExamReservationZip',
                params: {token: $.cookie('token')},
                dataType: 'json',
                onSend: function ($this, str) {
                    // $.jBox.tip("正在上传附件，请稍后", 'loading');
                    return true;
                },
                onComplate: function (data) {
                    if(data.success && data.data){
                        PageMain.funShowMessageBox("上传成功");
                        that.dataYytjGrid.reload();
                    } else {
                        PageMain.funShowMessageBox("附件上传失败");
                        return false;
                    }
                }
            });
            $this.upload("ajaxSubmit");
        },
    }
}();

$(function(){
    PageYytjImport.init();
});