const vehicles = {
  train: true,
  gobus: false,
  streetcar: true,
  subway: false,
  bus: false,
}

const updateVisuals = () => {
  Object.keys(vehicles).forEach((entry) => {
    if (vehicles[entry] === true) {
      document.getElementById(`${entry}-check`).className="fas fa-square";
    } else {
      document.getElementById(`${entry}-check`).className="far fa-square";
    }
  });
};

updateVisuals();

const updateActive = (obj) => {
  const selected = obj.attributes.name.value;
  vehicles[selected] = !vehicles[selected];
  updateVisuals();
}