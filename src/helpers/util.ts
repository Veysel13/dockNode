'use strict'

import { Request } from "express";

const path = require('path')
const requestIp = require('request-ip')
const validUrl = require('valid-url');

class Util {

    static useModel(model:string) {

        const models = [
            {
                'model': 'User',
                'path': '../Models/User/User',
            },
            {
                'model': 'UserDevice',
                'path': '../Models/User/UserDevice',
            },
            {
                'model': 'SmsCode',
                'path': '../Models/User/SmsCode',
            },
            {
                'model': 'UserPhoneChange',
                'path': '../Models/User/UserPhoneChange',
            },
            {
                'model': 'UserEmailChange',
                'path': '../Models/User/UserEmailChange',
            },
            {
                'model': 'Maintance',
                'path': '../Models/Maintance/Maintance',
            },
            {
                'model': 'Restaurant',
                'path': '../Models/Restaurant/Restaurant',
            },
            {
                'model': 'RestaurantUser',
                'path': '../Models/Restaurant/RestaurantUser',
            },{
                'model': 'Authorization',
                'path': '../Models/Restaurant/Authorization',
            },
            {
                'model': 'RestaurantSmsCode',
                'path': '../Models/Restaurant/RestaurantSmsCode',
            },
            {
                'model': 'RestaurantAuthorization',
                'path': '../Models/Restaurant/RestaurantAuthorization',
            },
            {
                'model': 'Table',
                'path': '../Models/Restaurant/Table',
            },
            {
                'model': 'CampaignType',
                'path': '../Models/Menu/Campaign/CampaignType',
            },
            {
                'model': 'Campaign',
                'path': '../Models/Menu/Campaign/Campaign',
            },
            {
                'model': 'Category',
                'path': '../Models/Menu/Category',
            },
            {
                'model': 'Product',
                'path': '../Models/Menu/Product',
            },
            {
                'model': 'OptionGroup',
                'path': '../Models/Menu/OptionGroup',
            },
            {
                'model': 'ProductOptionGroup',
                'path': '../Models/Menu/ProductOptionGroup',
            },
            {
                'model': 'Check',
                'path': '../Models/Check/Check',
            },
            {
                'model': 'Order',
                'path': '../Models/Check/Order',
            },
            {
                'model': 'OrderProduct',
                'path': '../Models/Check/OrderProduct',
            },
            {
                'model': 'OrderCampaign',
                'path': '../Models/Check/OrderCampaign',
            },
            {
                'model': 'Country',
                'path': '../Models/Definition/Country',
            }
        ];

        const found = models.find(element => element.model == model)

        const filePath = require(path.join(__dirname, found?.path))

        return filePath
    }

    static useLibraries(model:string) {

        const libraries = [
            {
                'model': 'Sms',
                'path': '../Libraries/Sms',
            },
            {
                'model': 'SocketIo',
                'path': '../Libraries/SocketIo',
            }
        ];

        const found = libraries.find(element => element.model == model);

        const filePath = require(path.join(__dirname, found?.path))

        return filePath;
    }

    static useRepository(model:string) {

        const libraries = [
            {
                'model': 'UserRepository',
                'path': '../Repository/User/UserRepository',
            },
            {
                'model': 'RestaurantUserRepository',
                'path': '../Repository/Restaurant/RestaurantUserRepository',
            },
            {
                'model': 'RestaurantRepository',
                'path': '../Repository/Restaurant/RestaurantRepository',
            },
            {
                'model': 'TableRepository',
                'path': '../Repository/Restaurant/TableRepository',
            }, {
                'model': 'CampaignRepository',
                'path': '../Repository/Menu/CampaignRepository',
            },
            {
                'model': 'CategoryRepository',
                'path': '../Repository/Menu/CategoryRepository',
            },
            {
                'model': 'ProductRepository',
                'path': '../Repository/Menu/ProductRepository',
            },
            {
                'model': 'ProductOptionGroupRepository',
                'path': '../Repository/Menu/ProductOptionGroupRepository',
            },
            {
                'model': 'OptionGroupRepository',
                'path': '../Repository/Menu/OptionGroupRepository',
            },
            {
                'model': 'CheckRepository',
                'path': '../Repository/Check/CheckRepository',
            },
            {
                'model': 'OrderRepository',
                'path': '../Repository/Check/OrderRepository',
            },
            {
                'model': 'OrderCampaignRepository',
                'path': '../Repository/Check/OrderCampaignRepository',
            },
            {
                'model': 'OrderProductRepository',
                'path': '../Repository/Check/OrderProductRepository',
            },
            {
                'model': 'LocationRepository',
                'path': '../Repository/Location/LocationRepository',
            }
        ];

        const found = libraries.find(element => element.model == model);

        const filePath = require(path.join(__dirname, found?.path))

        return filePath;
    }

    static constants(model:string) {

        const libraries = [
            {
                'model': 'SocketVariables',
                'path': '../Constants/Socket/SocketVariables',
            },
            {
                'model': 'CheckStatus',
                'path': '../Constants/Check/CheckStatus',
            }
        ];

        const found = libraries.find(element => element.model == model);

        const filePath = require(path.join(__dirname, found?.path))

        return filePath;
    }

    static generateSmsCode(){
        let verificationCode
        if(process.env.ENVIRONMNET=='local')
            verificationCode = 111111
        else
            verificationCode = Math.floor(100000 + Math.random() * 900000)

        return verificationCode
    }

    static employeeCode(){

        let verificationCode = Math.floor(100 + Math.random() * 999)

        return verificationCode
    }

    static getIP(req:Request){
        
      return  requestIp.getClientIp(req)
    }

    static isValidUrl(url:string){
        if (validUrl.isUri(url) && (url.includes('http://') || url.includes('https://'))){
            return true;
        }else {
            return false;
        }
    }

}

module.exports = Util;