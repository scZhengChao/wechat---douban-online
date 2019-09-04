// pages/search/search.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekly:[ ],
    loading:false,
    start:1,
    count:10,
    search:'',
    hasMore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadingDefault()
  },
  loadingDefault(){
    var _this = this;
    this.setData({
      loading: true
    })
    wx.request({
      url: app.globalData.baseUrl + "weekly", // 仅为示例，并非真实的接口地址
      header: {
        'content-type': 'json' // 默认值
      },
      data: {
        count: 3
      },
      success(res) {
        if (!res.data.subjects) return
        let results = [];
        res.data.subjects.map((item, index) => {
          results.push({
            image: item.subject.images.large,
            id: item.subject.id,
            title: item.subject.title,
            time: item.subject.pubdates[0],
            director: item.subject.directors[0].name,
            mark: item.subject.rating.average
          })
        })
        results = results.slice(0, 3)
        _this.setData({
          weekly: results,
          loading: false
        })
      }
    })
  },
  handleSearch(e){
    if(!e.detail.value) return
    this.setData({
      weekly: [],
      loading: true,
      search: e.detail.value,
      loading: false,
      start: 1,
      hasMore: true,
    })
   this.loadingSearch()
  },
  loadingSearch(){
    this.setData({
      loading:true
    })
    // console.log(this.data.search)
    let results = []
    wx.request({
      url: app.globalData.baseUrl + "search?q=" + this.data.search ,
      header: {
        'content-type': 'json' // 默认值
      },
      data:{
        start:this.data.start++,
        count:this.data.count
      },
      success: (res) => {
        if (!res.data.subjects.length){
          this.setData({
            loading:false,
            hasMore:false
          })
          return
        } 
        res.data.subjects.map((item, index) => {
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
          weekly: this.data.weekly.concat(results),
          loading: false
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
    this.data.weekly = [];
    this.data.start = 1;
    this.loadingSearch()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadingSearch()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onUnload(){
 
  }
})