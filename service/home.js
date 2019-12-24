import request from './network.js'

const baseURL = 'http://101.133.164.180:8080/wumei-server'

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