const Buttons = (props) => {
    const { buttonName, buttonClass, handleClick } = props;

    return (
        <>
            <button className={buttonName === "0" ? "doubleWidth" : buttonClass} onClick={() => handleClick(buttonName)}>
                {buttonName}
            </button>
        </>
    );
}

export default Buttons;