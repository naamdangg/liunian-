/* The normalized master timeline is the single source of scene order and anchors. */
const CAMERA_ANCHORS = Object.freeze({
  opening: [0.02, 0.46], blackPull: [0.08, 0.49], openingMessage: [0.13, 0.48],
  ltv: [0.19, 0.38], ltvMessage: [0.23, 0.52], photo2: [0.28, 0.59], photo3: [0.30, 0.55],
  sCurve: [0.35, 0.42], tata: [0.40, 0.36], twist: [0.45, 0.53], drop: [0.49, 0.70],
  chat: [0.53, 0.62], chatMessage: [0.56, 0.47], date2410: [0.59, 0.34], meaning2410: [0.62, 0.51],
  togetherMessage: [0.65, 0.61], highway: [0.68, 0.40], photo4: [0.70, 0.37], photo5: [0.715, 0.55],
  photo6: [0.73, 0.66], photo7: [0.745, 0.46], photo8: [0.76, 0.34], photo9: [0.775, 0.57],
  firstsMessage: [0.79, 0.43], photo10: [0.805, 0.35], photo11: [0.817, 0.55], photo12: [0.83, 0.65],
  hardTimes: [0.842, 0.48], photo13: [0.853, 0.34], photo14: [0.864, 0.53], photo15: [0.875, 0.64],
  photo16: [0.886, 0.43], photo17: [0.897, 0.32], happyMessage: [0.908, 0.52], collage99: [0.922, 0.48],
  emotionalText: [0.944, 0.37], essay: [0.962, 0.52], overview: [0.976, 0.47], lily: [0.983, 0.42],
  lilyField: [0.988, 0.57], fireworks: [0.993, 0.47], quiet: [0.997, 0.39], qr: [1, 0.53]
});

const STORY = Object.freeze([
  ['opening','Opening image',0,.035], ['blackPull','Black pull',.035,.065], ['openingMessage','Opening message',.065,.095],
  ['ltv','Lương Thế Vinh',.095,.13], ['ltvMessage','LTV memory',.13,.16], ['photo2','Photograph 2',.16,.18],
  ['photo3','Photograph 3',.18,.20], ['sCurve','S-curve',.20,.235], ['tata','Tata V BTS',.235,.27],
  ['twist','Unraveling text',.27,.30], ['drop','The fall',.30,.315], ['chat','Chat memory',.315,.345],
  ['chatMessage','The beginning',.345,.36], ['date2410','24-10-2020',.36,.375], ['meaning2410','2 4 1 0',.375,.395],
  ['togetherMessage','Together',.395,.41], ['highway','Memory highway',.41,.445], ['photo4','Photograph 4',.445,.455],
  ['photo5','Photograph 5',.455,.465], ['photo6','Photograph 6',.465,.475], ['photo7','Photograph 7',.475,.485],
  ['photo8','Photograph 8',.485,.495], ['photo9','Photograph 9',.495,.505], ['firstsMessage','Firsts',.505,.52],
  ['photo10','Photograph 10',.52,.53], ['photo11','Photograph 11',.53,.54], ['photo12','Photograph 12',.54,.55],
  ['hardTimes','Through difficulty',.55,.565], ['photo13','Photograph 13',.565,.575], ['photo14','Photograph 14',.575,.585],
  ['photo15','Photograph 15',.585,.595], ['photo16','Photograph 16',.595,.605], ['photo17','Photograph 17',.605,.615],
  ['happyMessage','Happiness',.615,.63], ['collage99','Ninety-nine memories',.63,.68],
  ['emotionalText','Words from the heart',.68,.76], ['essay','The letter',.76,.84], ['overview','The whole journey',.84,.90],
  ['lily','A double lily',.90,.925], ['lilyField','A field of flowers',.925,.95], ['fireworks','Celebration',.95,.975],
  ['quiet','Quiet',.975,.986], ['qr','The destination',.986,1]
].map(([id,title,start,end]) => Object.freeze({id,title,start,end,anchor:CAMERA_ANCHORS[id]})));

/* Exact narrative strings from STORY_CONTENT.md. */
const STORY_COPY = Object.freeze({
  opening: 'Cùng bắt đầu hành trình diệu kỳ này nhé!',
  openingMessage: 'Nơi mọi chuyện bắt đầu',
  ltv: '📍 Trường THCS&THPT Lương Thế Vinh - Cơ Sở Cầu Giấy',
  ltvMessage: 'Vào một ngày mà những tia nắng đã đưa nụ cười của cậu vào trái tim tớ',
  sCurve: 'Sau một năm, có lẽ santa đã dùng phép màu giáng sinh đã đưa 2 trái tim lại gần hơn',
  tataFirst: 'Bảo nhận quà nhưng không nhận tình à?',
  tataSecond: 'Chắc không đóoooooo',
  twist: ['Có vẻ là không nhỉ','Bởi vì','Ngày này 6 năm trước','24-10-2020'],
  recipient: 'Bảo Hà - LTV 6A5',
  chatQuestion: 'Vậy c đồng ý làm ng của tớ nhé',
  chatReply: 'Um',
  chatMessage: 'và đó là khi mọi thứ chính thức bắt đầu',
  date: '24-10-2020',
  meaning2410: ['2','4','1','0'],
  emotional: [
    'Đẹp thật nhỉ,','chuyện tình mình.','Nói thật lòng với cậu là','trong lúc làm món quà này','khi tớ xem lại toàn bộ những bức ảnh, những kỉ niệm trong máy',
    'tớ có nhiều cảm xúc đến mức không biết phải diễn tả ra sao','Nhìn lại cả một đoạn hành trình mà cậu đã đồng hành cùng tớ','⅓ cuộc đời hiện tại của tớ',
    'tớ lại cảm thấy biết bao cảm xúc hỗn độn, cảm thấy bản thân may mắn, cảm thấy biết ơn, cảm thấy hạnh phúc, cảm thấy bản thân mắc nợ cậu quá nhiều',
    'Mặc dù tớ đã nói câu này nhiều lần lắm rồi','Nhưng tớ vẫn muốn nói lại','Tớ yêu Bông','Tớ yêu Bông rất nhiều','Yêu Bông nhiều nhất thế giới',
    'Tớ vẫn luôn và sẽ luôn biết ơn cậu rất nhiều vì đã xuất hiện trong cuộc đời của tớ, cùng tớ trưởng thành','Cậu đã luôn và sẽ luôn là lý do để tớ tiếp tục cố gắng',
    'Tớ biết rằng bản thân tớ sẽ làm được','Và cũng biết rằng cả 2 chúng ta sẽ cùng nhau làm được',
    'Tớ biết rằng tớ và cậu sẽ lại cùng nhau vượt qua tất cả những gì sẽ tới trong tương lai','Mặc dù còn chả biết đó là gì, nhưng tớ biết',
    'Chỉ cần có cậu ở bên, dù có là chuyện gì rồi cũng có thể vượt qua hết','Ngày này 6 năm trước, chuyện tình của mình bắt đầu',
    'Đến ngày hôm nay','Cả tớ và Bông đã cùng nhau tiếp tục bước sang những giai đoạn mới',
    'Đây là giai đoạn mà cả hai cùng nuôi dưỡng tương lai của bản thân và của chính đôi mình',
    'Mặc dù có những lúc bất lực vì nỗi nhớ chợt đến mà không thể làm gì','Nhưng tớ vẫn tin rằng tất cả mọi thứ đều xứng đáng',
    'Ngày này 6 năm trước,','Tớ tin rằng hai đứa trẻ ấy chắc chắn đều không thể ngờ được rằng 6 năm sau chúng lại đang sống trong một tương lai hạnh phúc đến thế',
    'Tớ chúc cho chúng ta có thể tiếp tục hạnh phúc,',
    'hạnh phúc đến mức tớ và Bông ở hiện tại nếu nhìn vào sẽ phản ứng như cách tớ và Bông của 2020 phản ứng với hiện tại này',
    'Rồi lại chúc cho tớ và Bông của 60 năm sau, khi nhìn lại cả một cuộc đời mà một nửa thực sự là đối phương sẽ mỉm cười từ tận đáy lòng bởi đã luôn nỗ lực, luôn hết mình vì hiện tại',
    'Một lần nữa, Nam xin cảm ơn Bông, cảm ơn cậu vì đã giúp tớ trở thành phiên bản hiện tại của chính tớ. Nam xin lỗi Bông vì những lần đã làm cậu tổn thương trong quá khứ. Nam chắc chắn sẽ yêu cậu nhiều hơn, cũng xin được cậu yêu nhiều hơn, xin cho Bông luôn hạnh phúc, xin cho chúng mình sẽ được tiếp tục có nhau là người yêu, là tri kỉ, và xin cho đoạn duyên này sẽ không bao giờ đứt, xin cho tất cả những sự chân thành, tất cả những nỗ lực của cả 2 sẽ được bánh xe của số phận tác thành.',
    'Bông ơi','Tớ yêu cậu'
  ],
  signoff: 'Thượng Hải, 24/10/2026\n\nNgười yêu của cậu -\n\nNam Dang'
});
