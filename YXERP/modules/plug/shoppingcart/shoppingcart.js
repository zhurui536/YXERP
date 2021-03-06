﻿
/* 
作者：Allen
日期：2015-9-13
示例:
    $(...).createCart(callback);
*/

define(function (require, exports, module) {
    var Global = require("global"),
        doT = require("dot");
    require("plug/shoppingcart/style.css");
    (function ($) {
        $.fn.createCart = function (ordertype) {
            return this.each(function () {
                var _this = $(this);
                $.fn.drawCart(_this, ordertype);
            })
        }

        $.fn.drawCart = function (obj, ordertype) {
            Global.post("/Orders/GetShoppingCartCount", { ordertype: ordertype }, function (data) {
                doT.exec("plug/shoppingcart/shoppingcart.html", function (templateFun) {
                    var innerText = templateFun([]);
                    innerText = $(innerText);
                    innerText.find(".totalcount").html(data.Quantity);
                    //入库单
                    if (ordertype == 1) {
                        innerText.find(".totalcount").attr("href", "/Purchase/ConfirmPurchase");
                    }
                    obj.append(innerText);
                });
            });
        }
    })(jQuery)
    module.exports = jQuery;
});