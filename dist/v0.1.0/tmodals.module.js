const tmodals = (function () {
  const config = {
    mainContainerDOM: null,
    itemList: [],
  };

  const baseModal = {
    id: "test",
    order: 0,
    html: "",
    classList: [],
    fnRunBefore: null,
    fnRunAfter: null,
    isBackgroundVisible: false,
    isCloseWithBackground: false,
  };

  function fnGenerateId() {
    return crypto.randomUUID();

    // return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    //   const r = Math.random() * 16 | 0;
    //   const v = c === 'x' ? r : (r & 0x3 | 0x8);
    //   return v.toString(16);
    // });
  }

  function _fnRefreshMainContainerDOM() {
    config.mainContainerDOM = document.querySelector(".t-modals");

    if(config.mainContainerDOM == null) {
      const newContainer = document.createElement("div");
      newContainer.classList.add("t-modals");
      document.body.appendChild(newContainer);
      config.mainContainerDOM = newContainer;
    }
  }

  function _fnSetupCloseEscape() {
    document.addEventListener("keydown", (event) => {
      if(event.key === "Escape") {
        tmodals.fnCloseWithEscape();
      }
    });
  }

  function fnSetup() {
    _fnRefreshMainContainerDOM();
    _fnSetupCloseEscape();
  }

  fnSetup();

  function _fnSaveModalData(modalData = {}) {
    const modal = {
      ...baseModal,
      ...modalData,
    };
    modal.order = Date.now();
    config.itemList.push(modal);
  }

  function _fnRenderModal(id) {
    const modalDOM = document.createElement("div");
    modalDOM.classList.add("t-modal-item", ...config.itemList.find(item => item.id === id).classList);
    modalDOM.id = id;
    const modalBackgroundDOM = document.createElement("div");
    modalBackgroundDOM.classList.add("t-modal-bg");
    modalBackgroundDOM.dataset.isBackgroundVisible = config.itemList.find(item => item.id === id).isBackgroundVisible;
    modalDOM.appendChild(modalBackgroundDOM);
    const modalContainerDOM = document.createElement("div");
    modalContainerDOM.classList.add("t-modal-container");
    modalDOM.appendChild(modalContainerDOM);
    const modalContentDOM = document.createElement("div");
    modalContentDOM.classList.add("t-modal-content");
    modalContentDOM.innerHTML = config.itemList.find(item => item.id === id).html;
    modalContainerDOM.appendChild(modalContentDOM);
    modalDOM.appendChild(modalContainerDOM);
    config.mainContainerDOM.appendChild(modalDOM);
    const btnCloseDOM = document.createElement("button");
    btnCloseDOM.classList.add("t-modal-close-btn");
    btnCloseDOM.textContent = "x";
    modalContainerDOM.appendChild(btnCloseDOM);
    if(config.itemList.find(item => item.id === id).isCloseWithBackground) {
      modalBackgroundDOM.addEventListener("click", (event) => {
        tmodals.fnClose(id);
      });
    }
    btnCloseDOM.addEventListener("click", (event) => {
      tmodals.fnClose(id);
    });
  }

  async function _fnSetupModal(id) {
    const item = config.itemList.find(item => item.id === id);
    if(!item) {
      return;
    }

    if(item.fnRunBefore != null) {
      try {
      await item.fnRunBefore();
      } catch (error) {
        console.error(`Error in fnRunBefore for modal ${id}:`, error);
      }
    }

    _fnRenderModal(id);

    if(item.fnRunAfter != null) {
      try {
        await item.fnRunAfter();
      } catch (error) {
        console.error(`Error in fnRunAfter for modal ${id}:`, error);
      }
    }
  }

  function fnClose(id) {
    const modalItem = document.getElementById(id);
    if(!modalItem) {
      return;
    }
    modalItem.remove();
    const itemIndex = config.itemList.findIndex(item => item.id === id);
    if(itemIndex > -1) {
      config.itemList.splice(itemIndex, 1);
    }
  }

  function fnCloseWithEscape() {
    const lastModal = config.itemList.sort((a, b) => a.order - b.order)[config.itemList.length - 1];
    if(lastModal) {
      fnClose(lastModal.id);
    }
  }

  function fnCloseAll() {
    config.itemList.length = 0;
    config.mainContainerDOM.innerHTML = "";
  }

  function fnShow({
    id = "",
    html = "",
    classList = [],
    fnRunBefore = null,
    fnRunAfter = null,
    isBackgroundVisible = false,
    isCloseWithBackground = false,
  } = {}) {
    if(id.length <= 0) {
      id = fnGenerateId();
    }
    _fnSaveModalData({ id, html, classList, fnRunBefore, fnRunAfter, isBackgroundVisible, isCloseWithBackground });
    _fnSetupModal(id);
    return id;
  }

  return {
    config: config,
    fnGenerateId,
    fnShow,
    fnClose,
    fnCloseWithEscape,
    fnCloseAll
  }
})();

export default tmodals;
