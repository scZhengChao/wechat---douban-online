// pages/list/list.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"数据加载中...",
    type:'top250',
    page:1,
    count:10,
    list:[],
    loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.data.title = options.title || this.data.title
   this.data.type = options.key || this.data.type
    this.load()
  },
  load(){
    this.setData({
      loading:true
    })
    wx.request({
      url: app.globalData.baseUrl + this.data.type , // 仅为示例，并非真实的接口地址
      data: {
        start:this.data.page++,
        count: this.data.count
      },
      header: {
        'content-type': 'json' // 默认值
      },
      success:(res)=> {
        let results = []
        if (!res.data.subjects) return
        res.data.subjects.map((item, index) => {
          if (/weekly|us_box/.test(this.data.type)){
           item = item.subject
          }
          results.push({
            image: item.images.large,
            id: item.id,
            title: item.title,
            time: item.pubdates[0],
            director: item.directors[0].name,
            mark: item.rating.average
          })
        })
        this.setData({
          list: this.data.list.concat(results),
          loading: false,
          title: res.data.title
        })
        wx.setNavigationBarTitle({
          title: this.data.title 
        })
        wx.stopPullDownRefresh()
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.load()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})