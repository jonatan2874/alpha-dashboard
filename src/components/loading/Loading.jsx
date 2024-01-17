import styles from './styles.css';

const Loading = ()=>{
    return(
        <div className="min-h-screen flex items-center justify-center p-4 bg-secondary-900 text-gray-300">
            <div className="lds-ripple inline-block relative w-20 h-20">
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Loading
