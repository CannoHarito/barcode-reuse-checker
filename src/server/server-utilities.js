// Use ES6/7 code
const doGet = (e) => {
  const query = (e.parameter.q !== void (0)) ? e.parameter.q : '';
  const html = HtmlService.createTemplateFromFile('index');
  html.query = query;
  return html.evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle('Barcode Reuse Checker');
};

const fetchPrice = (service, query) => {
  return services[service].startFetch(query);
};

/**
 *買取サービスの検索方法を表すクラス
 *
 * @class Service
 */
class Service {
  /**
   *Creates an instance of Service.
   * @param {String} name
   * @param {Function} urlFunc
   * @param {String} charset
   * @param {RegExp} regexp
   * @param {Function} returnFunc
   * @memberof Service
   */
  constructor(name, urlFunc, charset, regexp, returnFunc) {
    this.name = name;
    this.urlFunc = urlFunc;
    this.charset = charset;
    this.regexp = regexp;
    this.returnFunc = returnFunc;
  }

  /**
   *
   *
   * @param {String} query
   * @return {Object}
   * @memberof Service
   */
  startFetch(query) {
    const html = UrlFetchApp.fetch(this.urlFunc(query))
      .getContentText(this.charset);
    const items = [];
    let matches;
    while ((matches = this.regexp.exec(html)) !== null) {
      items.push(this.returnFunc(matches));
    }
    return { service: this.name, query: query, items: items };
  }
}
const services = {
  BookOffOnline: new Service(
    'BookOffOnline',
    // eslint-disable-next-line no-undef,new-cap
    (q) => 'https://www.bookoffonline.co.jp/boleccontent/bolbuysearch/buysearch/search?bg=&q=' + EscapeSJIS(q),
    'ms932',
    // eslint-disable-next-line max-len
    new RegExp(/class="sell-item-title-maintitle">(.+?)<\/span>[\s\S]+?class="sell-item-price.+?>([-\d]+)円/g),
    (m) => ({ price: m[2], title: m[1] })
  ),
  NetOff: new Service(
    'NetOff',
    (q) => 'https://www.netoff.co.jp/sellcont/nid/PurchaseList/cid/?P2=&P9=4&P10=2&actionNameTxt=&cboCtgry=&cboLRack=&SearchKeyWord1=' + q + '&hdnSearchKeyWord1=' + q + '&hdnSearchKeyWord2=',
    'utf-8',
    // eslint-disable-next-line max-len, no-control-regex, no-tabs
    new RegExp(/border="">(.+?)<\/span><\/A>	<!-- タイトル -->[\s\S]+?texttype01" style="text-align:center;">([\d,]+)円<\/td>				<!-- 買取価格 -->/g),
    (m) => {
      return { price: m[2], title: m[1] };
    }
  ),
};

export {
  doGet,
  fetchPrice,
};
