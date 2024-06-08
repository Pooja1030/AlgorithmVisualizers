const AlgorithmCard = ({ title, description, link }) => {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{description}</p>
            {link && <button title="Read more">
                <a href={link} target="_blank" rel="noopener noreferrer">Read more</a>
            </button>}
        </div>
    );
};

export default AlgorithmCard;