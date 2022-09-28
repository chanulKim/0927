sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast) {
        "use strict";

        return Controller.extend("odata.controller.View1", {
            onInit: function () {
                var odata = {
                salesOrderNum : null, 
                salesOrderMemo : null 

                };
                var oModel = new JSONModel(odata);
                this.getView().setModel(oModel, "view");


            },

            //생성
            onCreate: function () {

                var oModel = this.getView().getModel(); // oDataModel 객체 ( 이름x )
                var oViewModel = this.getView().getModel("view");
                var sSONUM = oViewModel.getProperty("/salesOrderNum");
                var sMemo = oViewModel.getProperty("/salesOrderMemo");
                var oCreateData =  { Sonum : sSONUM , Memo : sMemo };
                
                oModel.create("/SalesOrderSet", oCreateData, { 
                    success : function () {
                        oViewModel.setProperty("/salesOrderNum", null);
                        oViewModel.setProperty("/salesOrderMemo", null);
                        MessageToast.show("저장 되었습니다.");

            
                    }

                });  // POST

                //ui5 framework odataV2 모델 api(메소드기능)으로 생성요청
            },

            //삭제
            onDelete : function (oEvent) {
                //내가 삭제버튼을 누른 엔티티의 상세주소를 추출해서 삭제요청
            
                var sPath = oEvent.getParameter("listItem").getBindingContextPath();
                var oModel = this.getView().getModel();

                //Delete http 요청 처리
                oModel.remove(sPath, { 
                    success: function() {
                        MessageToast.show("삭제 되었습니다.");
                    }
                });
            
            },

            // 수정모드 : 테이블 행 선택 가능
            onPressEdit : function () {
                this.byId("table").setMode("SingleSelectMaster");


            },

            // 삭제모드 : 테이블 오른쪽에 x 버튼 생김
            onPressDel : function () {
                this.byId("table").setMode("Delete");


            },
            // 테이블에서 선택한 행이 입력창에 나오게 함
            onPressItem : function (oEvent) {
                var sPath = oEvent.getParameter("listItem").
                getBindingContextPath();
                var oModel = this.getView().getModel();
                var oData = oModel.getProperty(sPath);

                var oViewModel = this.getView().getModel("view");
                oViewModel.setProperty("/salesOrderNum",oData.Sonum );
                oViewModel.setProperty("/salesOrderMemo",oData.Memo);

            },

            //업데이트 
            onUpdate : function () {
                var oViewModel = this.getView().getModel("view"); // view 이름을 가진 모델을 가져옴 
                var sSONUM = oViewModel.getProperty("/salesOrderNum"); // view1.view에서 salesOrderNum값을 가져옴
                var sMemo =  oViewModel.getProperty("/salesOrderMemo"); // view1.view에서 salesOrderMemo값을 가져옴
                var oModel = this.getView().getModel();         // oModel 선언  
                var oData = { Sonum : sSONUM, Memo : sMemo};   // oData 에 가져온 값(sSONUM) 넣기 
                var sPath = "/SalesOrderSet('" + sSONUM +"')"

                // PUT ( update 요청)
                oModel.update(sPath, oData, {
                    success : function () {
                        MessageToast.show("변경 되었습니다.");
                    }
                });
            },


            // 새로고침
            onRefresh : function() {
                this.getView().getModel().refresh()

            }
            

        });
    });
