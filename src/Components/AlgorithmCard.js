const AlgorithmCard = ({ title, description, link }) => {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{description}</p>
            <button>
                <a href={link} target="_blank" rel="noopener noreferrer">Read More</a>
            </button>
        </div>
    );
};

export default AlgorithmCard;