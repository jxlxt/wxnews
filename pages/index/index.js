//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    headerTitleName: [{
      name: '国内',
      newsType: 'gn'
    }, {
      name: '国际',
      newsType: 'gj'
    }, {
      name: '财经',
      newsType: 'cj'
    }, {
      name: '娱乐',
      newsType: 'yl'
    }, {
      name: '军事',
      newsType: 'js'
    }, {
      name: '体育',
      newsType: 'ty'
    }, {
      name: '其他',
      newsType: 'other'
    }],
    tapID: 'gn', //判断是否选中
    contentNewsList: {},
  },

  //headerBar 点击
  headerTitleClick: function(e) {
    let _this = this;
    let newsType = e.currentTarget.dataset.newstype;
    this.showData(newsType);
  },

  //跳转到新闻详情页

  viewDetail: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  },

  onLoad: function() {
    this.showData('gn');
  },
  showData: function(newsType) {
    var _this = this;
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list?type=' + newsType,
      method: 'GET',
      success: res => {
        let resultData = res.data.result;
        for (var i = 0; resultData.length > i; i++) {
          var d = new Date(resultData[i].date);
          resultData[i].date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
          resultData[i].firstImage == "" ? "../../img/loading.png":resultData[i].firstImage; 
        }
        _this.setData({
          contentNewsList: resultData,
          tapID: newsType
        })
      }
    })
  },
  //页面下拉处理
  onPullDownRefresh:function () {
    this.showData(this.data.tapID);
  }
})