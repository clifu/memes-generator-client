class MemeDTO {
    constructor(id, title, description, imageUrl, profileId, imageData) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.profileId = profileId;
        this.imageData = imageData;
    }
}

export default MemeDTO;