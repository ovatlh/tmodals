var tmodals=tmodals||(function () {
  const _DATA = {
    id: 1,
    order: 1,
    container: null,
    modals: {},
    closeAllDelaySec: 0.1,
  };
  let _show_Error_Message = true;
  let _show_Debug_Message = true;

  const temp_obj_modal = {
    id: "",
    order: 0,
    html: "",
    backgroundDom: null,
    isAnimationOutBackgoundEnd: false,
    modalItemDom: null,
    modalContentDom: null,
    isAnimationOutContentEnd: false,
    btnCloseDom: null,
    hasBackground: true,
    isCloseBackground: true,
    isCloseButton: false,
    closeOnSec: 0,
  };

  function _close(id) {
    try {
      _DATA.modals[id].modalItemDom.remove();
      delete _DATA.modals[id];

      const modals_count = Object.keys(_DATA.modals).length;
      if(modals_count <= 0) {
        _DATA.container.remove();
        _DATA.container = null;
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error(error);
      }
    }
  }

  function _validate_close(id) {
    try {
      if(_DATA.modals[id].isAnimationOutBackgoundEnd && _DATA.modals[id].isAnimationOutContentEnd) {
        _close(id);
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error(error);
      }
    }
  }

  function _setup_animation_event(id) {
    try {
      _DATA.modals[id].backgroundDom.addEventListener("animationend", (event) => {
        if(event.animationName == "t-modal-bg-in") {
          // console.log("animation end: t-modal-bg-in");
        }
        if(event.animationName == "t-modal-bg-out") {
          // console.log("animation end: t-modal-bg-out");
          _DATA.modals[id].isAnimationOutBackgoundEnd = true;
        }
      });
      _DATA.modals[id].modalContentDom.addEventListener("animationend", (event) => {
        if(event.animationName == "t-modal-content-in") {
          // console.log("animation end: t-modal-content-in");
          _validate_close(id);
        }
        if(event.animationName == "t-modal-content-out") {
          // console.log("animation end: t-modal-content-out");
          _DATA.modals[id].isAnimationOutContentEnd = true;
          _validate_close(id);
        }
      });
    } catch (error) {
      if(_show_Error_Message) {
        console.error(error);
      }
    }
  }

  function _setup_events(id) {
    try {
      if(_DATA.modals[id].isCloseBackground) {
        _DATA.modals[id].backgroundDom.addEventListener("click", e => {
          fnClose({ id: id });
        });
      }
      if(_DATA.modals[id].isCloseButton) {
        _DATA.modals[id].btnCloseDom.addEventListener("click", e => {
          fnClose({ id: id });
        });
      }
      if(_DATA.modals[id].closeOnSec > 0) {
        setTimeout(() => {
          if(_DATA.modals[id]) {
            fnClose({ id: id });
          }
        }, 1000 * _DATA.modals[id].closeOnSec);
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error(error);
      }
    }
  }

  function _refresh_dom_reference(id) {
    try {
      _DATA.modals[id].backgroundDom = document.querySelector(`#${id} > .t-modal-bg`);
      _DATA.modals[id].modalContentDom = document.querySelector(`#${id} > .t-modal-content`);
      _DATA.modals[id].modalItemDom = document.querySelector(`#${id}`);
      _DATA.modals[id].btnCloseDom = document.querySelector(`#${id} > .t-modal-content > .t-modal-close-btn`);
    } catch (error) {
      if(_show_Error_Message) {
        console.error(error);
      }
    }
  }

  function _render_HTML(id) {
    try {
      if(_DATA.container == null) {
        const container_DOM = document.querySelector(".t-modal-container");
        if(!container_DOM) {
          const new_container_DOM = document.createElement("div");
          new_container_DOM.classList.add("t-modal-container");
          document.body.appendChild(new_container_DOM);

          const _new_container_DOM = document.querySelector(".t-modal-container");
          _DATA.container = _new_container_DOM;
        } else {
          _DATA.container = container_DOM;
        }
      }

      const t_modal_item_DOM = document.createElement("div");
      const t_modal_class_list = ["t-modal-item", "t-modal-in"];
      t_modal_item_DOM.classList.add(...t_modal_class_list);
      t_modal_item_DOM.id = id;

      const bg_classList = ["t-modal-bg"];
      if(!_DATA.modals[id].hasBackground) {
        bg_classList.push("no-bg");
      }
      const res_bg_classList = bg_classList.join(" ");
      let res_close_btn_HTML = "";
      if(_DATA.modals[id].isCloseButton) {
        res_close_btn_HTML = `
          <button class="t-modal-close-btn">x</button>
        `;
      }

      t_modal_item_DOM.innerHTML = `
        <div class="${res_bg_classList}"></div>

        <div class="t-modal-content">
          ${_DATA.modals[id].html}
          ${res_close_btn_HTML}
        </div>
      `;

      _DATA.container.appendChild(t_modal_item_DOM);
    } catch (error) {
      if(_show_Error_Message) {
        console.error(error);
      }
    }
  }

  function _save_data({
    id = "",
    order = 0,
    html = "",
    hasBackground = true,
    isCloseBackground = true,
    isCloseButton = false,
    closeOnSec = -1,
  } = {}) {
    try {
      _DATA.modals[id] = {
        order: order,
        html: html,
        hasBackground: hasBackground,
        isCloseBackground: isCloseBackground,
        isCloseButton: isCloseButton,
        closeOnSec: closeOnSec,
        backgroundDom: null,
        isAnimationOutContentEnd: false,
        modalContentDom: null,
        isAnimationOutBackgoundEnd: false,
        modalItemDom: null,
        btnCloseDom: null,
      };
    } catch (error) {
      if(_show_Error_Message) {
        console.error(error);
      }
    }
  }

  function _setup_close_last_open() {
    try {
      const modal_id_list = Object.keys(_DATA.modals);
      const modal_item_list = modal_id_list.map((id) => {
        const temp_modal_obj = {
          id: id,
          order: _DATA.modals[id].order,
        };

        return temp_modal_obj;
      });

      const modal_order_id = modal_item_list.sort(function (a,b) { return b.order - a.order; });

      if(modal_order_id.length > 0) {
        const modal_last_id = modal_order_id[0];
        fnClose({ id: modal_last_id.id });
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error(error);
      }
    }
  }

  function _setup_close(id) {
    try {
      requestAnimationFrame(() => {
        if(_DATA.modals[id]) {
          _DATA.modals[id].modalItemDom.classList.add("t-modal-out");
        }
      });
    } catch (error) {
      if(_show_Error_Message) {
        console.error(error);
      }
    }
  }

  function _setup_close_all({
    isAtSameTime = false,
  } = {}) {
    try {
      const modal_id_list = Object.keys(_DATA.modals);
      const modal_item_list = [];
      modal_id_list.forEach((id) => {
        const temp_modal_obj = {
          id: id,
          order: _DATA.modals[id].order,
        };

        modal_item_list.push(temp_modal_obj);
      });
      const modal_item_list_bt_order_desc = modal_item_list.sort(function (a, b) {  return b.order - a.order;  });
      
      if(isAtSameTime) {
        modal_item_list_bt_order_desc.forEach((item) => {
          _setup_close(item.id);
        });
      } else {
        modal_item_list_bt_order_desc.forEach((item, index) => {
          const sec = 1000 * _DATA.closeAllDelaySec;
          setTimeout(() => {
            _setup_close(item.id);
          }, sec * index);
        });
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error(error);
      }
    }
  }

  function fnCloseAll({
    isAtSameTime = false,
  } = {}) {
    try {
      _setup_close_all({ 
        isAtSameTime: isAtSameTime 
      });
    } catch (error) {
      if(_show_Error_Message) {
        console.error(error);
      }
    }
  }

  function fnClose({
    id = "",
  } = {}) {
    try {
      if(id.length <= 0) {
        _setup_close_last_open();
      } else {
        _setup_close(id);
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error(error);
      }
    }
  }

  function fnGenId() {
    let res_id = "";
    try {
      const id = `t-modal-${_DATA.id}`;
      _DATA.id += 1;
      res_id = id;
    } catch (error) {
      if(_show_Error_Message) {
        console.error(error);
      }
    }
    return res_id;
  }

  function fnShow({
    id = "",
    html = "",
    hasBackground = true,
    isCloseBackground = true,
    isCloseButton = false,
    closeOnSec = -1,
  } = {}) {
    try {
      let _id = id;
      if(id.length <= 0) {
        _id = fnGenId();
      }

      if(_DATA.modals[id]) {
        if(_show_Error_Message) {
          console.error(`Ya existe un modal con este id: [${id}]`);
        }

        return;
      }

      _save_data({
        id: _id,
        order: _DATA.order,
        html: html,
        hasBackground: hasBackground,
        isCloseBackground: isCloseBackground,
        isCloseButton: isCloseButton,
        closeOnSec: closeOnSec,
      });

      _render_HTML(_id);

      _refresh_dom_reference(_id);

      _setup_animation_event(_id);

      _setup_events(_id);

      _DATA.order += 1;
    } catch (error) {
      if(_show_Error_Message) {
        console.error(error);
      }
    }
  }

  return {
    DATA: _DATA,
    fnShow,
    fnClose,
    fnCloseAll,
    fnGenId,
  }
})();
