export const CUSTOMIZER_ITEMS_META = {
  acc_sunglasses: { src: 'assets/mascot/accessories/accessory_sunglasses_1780213487126.png', render: 'overlay', box: [56, 62, 146, 92], slot: 'face' },
  acc_crown: { src: 'assets/mascot/accessories/accessory_crown_1780213501375.png', render: 'overlay', box: [74, 0, 108, 108], slot: 'head' },
  acc_wand: { src: 'assets/mascot/accessories/accessory_wand_1780213517410.png', render: 'overlay', box: [150, 88, 90, 90], slot: 'hand' },
  acc_lollipop: { src: 'assets/images/store/lollipop.png', render: 'overlay', box: [20, 120, 74, 74], slot: 'hand_left' },
  acc_milktea: { src: 'assets/images/store/milktea.png', render: 'overlay', box: [172, 126, 58, 58], slot: 'hand_right' },
  acc_tophat: { src: 'assets/images/store/tophat.png', render: 'overlay', box: [76, 0, 106, 106], slot: 'head' },
  acc_cape: { src: 'assets/images/store/cape.png', render: 'overlay', box: [26, 96, 202, 130], slot: 'back' },
  acc_headphones: { src: 'assets/images/store/headphones.png', render: 'overlay', box: [48, 26, 160, 120], slot: 'ears' },
  acc_batman: { src: 'assets/images/store/batman.png', render: 'overlay', box: [34, 20, 184, 184], slot: 'face' },
  acc_spiderman: { src: 'assets/images/store/spiderman.png', render: 'overlay', box: [0, 112, 256, 90], opacity: 0.8, slot: 'body' },
  acc_console: { src: 'assets/images/store/console.png', render: 'overlay', box: [92, 154, 76, 76], slot: 'hand' },
};

export const MASCOT_COMBO_ASSETS = {
  'acc_crown+acc_wand': 'assets/images/mascot-combo-crown-wand.png',
  'acc_lollipop+acc_sunglasses': 'assets/images/mascot-combo-sunglasses-lollipop.png',
  'acc_lollipop+acc_milktea+acc_sunglasses': 'assets/images/mascot-combo-3-accessories.png',
};

export const MEO_STATE_ASSETS = {
  idle: 'assets/images/mascot_avatar.png',
  happy: 'assets/images/meo_happy_sticker_1780213430564.png',
  excited: 'assets/images/meo_happy_sticker_1780213430564.png',
  encouraging: 'assets/images/meo_thinking_sticker_1780213451318.png',
  thinking: 'assets/images/meo_thinking_sticker_1780213451318.png',
  reading: 'assets/images/meo_thinking_sticker_1780213451318.png',
  drawing: 'assets/images/meo_thinking_sticker_1780213451318.png',
  celebrating: 'assets/images/meo_celebrating_sticker_1780213464815.png',
  sad: 'assets/images/meo_sad_sticker_1780214484499.png',
  disappointed: 'assets/images/meo_disappointed_sticker_1780214499727.png',
  sleeping: 'assets/images/meo_disappointed_sticker_1780214499727.png',
  confused: 'assets/images/meo_confused_sticker_1780214514803.png',
  relaxed: 'assets/images/meo_relaxed_sticker_1780214530211.png',
  angry: 'assets/images/meo_angry_sticker_1780214546071.png',
};

export const GAU_STATE_ASSETS = {
  idle: 'assets/images/gau-lun-teacher-avatar.png',
  happy: 'assets/images/gau-lun-happy.png',
  excited: 'assets/images/gau-lun-happy.png',
  encouraging: 'assets/images/gau-lun-encouraging.png',
  thinking: 'assets/images/gau-lun-thinking.png',
  reading: 'assets/images/gau-lun-thinking.png',
  drawing: 'assets/images/gau-lun-thinking.png',
  celebrating: 'assets/images/gau-lun-celebrating.png',
  sad: 'assets/images/gau-lun-encouraging.png',
  disappointed: 'assets/images/gau-lun-thinking.png',
  sleeping: 'assets/images/gau-lun-thinking.png',
  confused: 'assets/images/gau-lun-thinking.png',
  relaxed: 'assets/images/gau-lun-teacher-avatar.png',
  angry: 'assets/images/gau-lun-encouraging.png',
};

export function comboKeyFromEquipped(equippedIds = []) {
  return [...equippedIds].sort().join('+');
}
