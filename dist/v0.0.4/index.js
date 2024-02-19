function fnGetRandomItem({
  itemList = [],
} = {}) {
  try {
    const itemCount = itemList.length;

    if(itemCount <= 0) {
      return null;
    }

    const item_Index = Math.floor(Math.random() * itemCount);
    const item = itemList[item_Index];

    return item;
  } catch (e) {
    console.error(e);
  }
}



function fn_create_modal_template() {
  const template_id_list = [
    "template01",
    "template02",
    "template03",
  ];
  const is_bg_list = [
    "yes",
    "no"
  ];
  const is_btn_close_list = [
    "yes",
    "no",
  ];
  const close_sec_list = [
    0,
    0,
    0,
    5,
  ];

  const res_id = fnGetRandomItem({ itemList: template_id_list });
  const template_DOM = document.getElementById(res_id);
  const res_bg = fnGetRandomItem({ itemList: is_bg_list });
  const is_bg = res_bg == "yes";
  const res_btn_close = fnGetRandomItem({ itemList: is_btn_close_list });
  const is_btn_close = res_btn_close == "yes";
  const res_close_sec = fnGetRandomItem({ itemList: close_sec_list });

  tmodals.fnShow({
    html: template_DOM.innerHTML,
    isCloseButton: is_btn_close,
    isCloseBackground: !is_btn_close,
    hasBackground: is_bg,
    closeOnSec: res_close_sec,
  });
}

function fn_form_submit(event) {
  event.preventDefault();
  alert("form_submit");
}

function fn_click_create_modal() {
  tmodals.fnShow({
    isCloseButton: true,
    isCloseBackground: false,
  });
}
