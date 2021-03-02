import '../index.css';
function LoadingCircle(props) {
    const { size, borderWidth } = props;
    return (
        <div
            style={{ width: size, height: size, borderWidth }}
            className="loading"
        ></div>
    );
}

export default LoadingCircle;