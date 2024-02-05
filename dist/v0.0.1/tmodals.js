var tmodals=tmodals||(function () {
  const _DATA = {
    id: 1,
    order: 1,
    container: null,
    modals: {},
  };
  let _show_Error_Message = true;
  let _show_Debug_Message = true;

  const temp_obj_modal = {
    id: "",
    order: 0,
    html: "",
    backgroundDom: null,
    modalItemDom: null,
    btnCloseDom: null,
    hasBackground: true,
    isCloseBackground: true,
    isCloseButton: false,
    closeOnSec: 0,
  };

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
      t_modal_item_DOM.classList.add("t-modal-item");
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
      };
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
    fnGenId,
  }
})();
