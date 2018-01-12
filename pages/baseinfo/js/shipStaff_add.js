
var PageShipStaffAdd = function(){
    return {
        defaultOption: {
            basePath:"",
            action : "",
            shipStaffForm : null

        },
        init :function ()
        {
            mini.parse();
            this.basePath = PageMain.basePath;
            this.shipStaffForm = new mini.Form("shipStaffFormAdd");
            mini.get("gender").setData([{id:1, name:"男"},{id:2, name:"女"}]);
            mini.get("title").setData([{id:1, name:"船长"},{id:2, name:"驾驶员"},{id:1, name:"轮机员"},{id:2, name:"水手"}]);
            mini.get("isOwner").setData([{id:1, name:"是"},{id:2, name:"否"}]);
            mini.get("status").setData([{id:1, name:"启用"},{id:2, name:"禁用"}]);
        },
        funSetData : function(data)
        {
            var row = data.row;
            this.action = data.action;
            this.shipStaffForm.setData(row);
            if(this.action == "oper")
            {
                mini.get("layout_shipStaff_add").updateRegion("south", { visible: false });//$(".mini-toolbar").hide();
                var fields = this.shipStaffForm.getFields();
                for (var i = 0, l = fields.length; i < l; i++)
                {
                    var c = fields[i];
                    if (c.setReadOnly) c.setReadOnly(true);     //只读
                    if (c.setIsValid) c.setIsValid(true);      //去除错误提示
                }
            }
        },
        funSave : function()
        {
            this.shipStaffForm.validate();
            if (!this.shipStaffForm.isValid())
            {
                var errorTexts = form.getErrorTexts();
                for (var i in errorTexts)
                {
                    mini.alert(errorTexts[i]);
                    return;
                }
            }

            var me = this;
            var obj = this.shipStaffForm.getData(true);
            $.ajax({
                url : PageMain.defaultOption.httpUrl + "/shipStaff/" + me.action + "?a="+Math.random(),
                type : 'POST',
                data : obj,
                dataType: 'json',
                success: function (data)
                {
                    if (data.success)
                    {
                        mini.alert("操作成功", "提醒", function(){
                            if(data.success)
                            {
                                PageMain.funCloseWindow("save");
                            }
                        });
                    }
                    else
                    {
                        PageMain.funShowMessageBox(data.msg);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown)
                {
                    PageMain.funShowMessageBox("操作出现异常");
                }
            });
        },
        funCancel : function()
        {
            PageMain.funCloseWindow("cancel");
        }
    }
}();

$(function(){
    PageShipStaffAdd.init();
});