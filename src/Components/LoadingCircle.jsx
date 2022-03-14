import '../index.css';
function LoadingCircle(props) {
    const { size, borderWidth } = props;
    return (
        <div className="center">
            <div
                style={{ width: size, height: size, borderWidth }}
                className="loading">
            </div>
        </div>
    );
}

export default LoadingCircle;