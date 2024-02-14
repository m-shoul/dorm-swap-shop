import ListingForm from "../../components/ListingForm";
import { useLocalSearchParams } from "expo-router";

export default function EditListings() {
    const { listingId, listingTitle, listingPrice, listingCategory, listingCondition, listingDescription } = useLocalSearchParams();
    return (
        <ListingForm header="Edit Listing"
            buttonTitle="Update"
            pressCommand={this.handleValidation}
            imageText="Change Image(s)"
            listingId={listingId}
            listingTitle={listingTitle}
            listingPrice={listingPrice}
            listingCategory={listingCategory}
            listingCondition={listingCondition}
            listingDescription={listingDescription}
        />
    );
};
