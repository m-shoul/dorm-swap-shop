import ListingForm from "../../components/ListingForm";

export default function EditListings() {
    return (
        <ListingForm header="Edit Listing" 
                     buttonTitle="Update" 
                    pressCommand={this.handleValidation} 
                    imageText="Change Image(s)"             
        />
    );
};
