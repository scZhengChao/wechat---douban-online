// pages/item/item.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'加载中',
    loading:true,
    detail:{},
    key:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!options.id) return
    this.data.key = options.id
    this.load()
   
  },
  load(){
    wx.request({
      url: app.globalData.baseUrl + 'subject/' + this.data.key, // 仅为示例，并非真实的接口地址
      header: {
        'content-type': 'json' // 默认值
      },
      success: (res) => {
        if (res.data.msg) {
          console.log('detail ID有误');
          return;
        }
        this.setData({
          detail: res.data,
          title: res.data.title
        });
        console.log(this.data.detail)
        wx.setNavigationBarTitle({ title: this.data.title + ' « 电影 « 豆瓣' }); //加载完了修改
      },
      complete: () => {
        this.setData({
          loading: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({ title: this.data.title + ' « 电影 « 豆瓣' })//先显示加载中
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})