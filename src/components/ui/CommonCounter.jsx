import React from 'react'
import { Icons } from '../../assets/Icons'

const CommonCounter = ({ small = false, counter, increaseCounter, decreaseCounter }) => {

    const styles = {
        "btnSize": `w-[${small ? "20" : "30"}px] h-[${small ? "20" : "30"}px] rounded`,

        "btnDecrease": `counter-btn ${counter === 0 ? "dis" : "bg-primary text-white text-xl"}`,

        "btnIncrease": `counter-btn bg-primary text-white text-xl`,

        "num": `font-semibold text-center ${small ? "text-sm w-[20px]" : "text-lg w-[30px]"}`
    };

    return (
        <div className='flex gap-2'>
            <button
                onClick={decreaseCounter}
                className={styles.btnSize + " " + styles.btnDecrease}
            >
                <Icons.BiMinus />
            </button>
            <div id="counterNum" className={styles.num}>{counter}</div>
            <button
                onClick={increaseCounter}
                className={styles.btnSize + " " + styles.btnIncrease}
            >
                <Icons.BiPlus />
            </button>
        </div>
    )
}

export default CommonCounter