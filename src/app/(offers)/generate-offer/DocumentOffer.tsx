import { Offer, OfferItem } from "@/types/offers";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Roboto",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9fafb",
    padding: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  row: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 5,
  },
  rowProduct: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  rowProductPrice:{
    display: "flex",
    flexDirection: "column",
    gap: 2,
  }
});

export const DocumentOffer = ({listName,offers}: {
  listName: string;
  offers: Offer[];
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <Text style={styles.title}>{listName}</Text>

        <View style={styles.header}>
          <Text style={styles.headerText}>Продукт</Text>
          <Text style={styles.headerText}>Цена на продукта</Text>
        </View>

        {offers.map((offer) => (

          <View style={styles.row} key={offer.id}>

            <View>
              <Text style={{fontSize:16,fontWeight:'bold'}}>{offer.manufacturer}</Text>
            </View>

            <View>
                {offer.products.map((product)=>(
                    <View key={product.productId} style={styles.rowProduct}>
                        <Text style={{fontSize:14}}>{product.productName}</Text>
                        <View style={styles.rowProductPrice}>
                            <Text style={{fontWeight:'bold',fontSize:14}}>{product.productPrice} {product.unit === "kg" ? "€ / кг" : "€ / бр."}</Text>
                            <Text style={{fontSize:12}}>{(Number(product.productPrice) * 1.95583).toFixed(2)} {product.unit === "kg" ? "лв / кг" : "лв / бр."}</Text>
                        </View>
                    </View>
                ))}
            </View>
           

          </View>
        ))}
      </Page>
    </Document>
  );
};
