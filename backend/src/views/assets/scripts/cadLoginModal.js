const toggleModal = () => {
    const bodyClassList = document.body.classList;

    if (bodyClassList.contains("open")) {
      bodyClassList.remove("open");
      bodyClassList.add("closed");
    } else {
      bodyClassList.remove("closed");
      bodyClassList.add("open");
    }
  };