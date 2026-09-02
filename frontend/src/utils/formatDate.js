const formatDate = (date) => {
    if (!date) {
        return "";
    }

    return new Date(date).toLocaleDateString();
};

export default formatDate;