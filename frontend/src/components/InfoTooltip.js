function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_visible-on" : ""}`}>
      <div className="popup__container popup__container_type_info ">
        <button
          className={`popup__cross`}
          type="button"
          aria-label="закрыть всплывающее окно"
          onClick={props.onClose}
        ></button>
        <div
          className={`popup__info-tooltip ${
            props.tooltipState
              ? "popup__info-tooltip_type_success"
              : "popup__info-tooltip_type_fail"
          }`}
        ></div>
        <h2 className="popup__title">
          {props.tooltipState ? props.tooltipSuccess : props.tooltipFail}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
