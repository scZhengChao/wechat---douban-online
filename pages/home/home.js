// pages/home/home.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:{
      key:"in_theaters",
      title:"正在热映",
      content:""
    },
    list:[
      {key:"coming_soon",title:"即将上映"},
      { key: "in_theaters", title: "正在热映" },
      { key: "top250", title: "Top250" },
      { key: "weekly", title: "周口碑榜" },
      { key: "new_movies", title: "新片榜" },
      { key: "us_box", title: "北美票房榜" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.baseUrl +this.data.banner.key, // 仅为示例，并非真实的接口地址
      data:{
        count:5
      },
      header: {
        'content-type': 'json' // 默认值
      },
      success:(res)=>{
        if(!res.data.subjects) return;
        let results = [];
        res.data.subjects.map((item,index)=>{
          results.push({
            image:item.images.large,
            id:item.id
          })
        })
        this.setData({
          "banner.content":results
        })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})