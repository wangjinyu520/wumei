import request from './network.js'

const baseURL = 'http://10.20.11.126:8080/wumei-server'

export function getMultiData(){
  return request({
    url: ''
  })
}

export function getMastersData(type, page){
  return request({
    url: baseURL+'/technology/getTechnologyList',
    data:{
      type,
      page
    }
  })
}

export function getProduct(type, page){
  return wx.request({
    url: baseURL +'/technology/getTechnologyList',
    data: {
      type, 
      page
    }
  })
}