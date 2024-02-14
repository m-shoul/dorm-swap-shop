import ListingForm from "../../components/ListingForm";
import { useLocalSearchParams } from "expo-router";

export default function EditListings() {
    const { listingTitle } = useLocalSearchParams();
    return (
        <ListingForm header="Edit Listing"
            buttonTitle="Update"
            pressCommand={this.handleValidation}
            imageText="Change Image(s)"
            listingtitle={listingTitle}
        />
    );
};
