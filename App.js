// TODO
// specify a tab
// actually save vote
// make less ugly
// deploy

import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Videoinfo from "./Videoinfo";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { case_num: 1 };
  }
  //async componentWillMount() {
  async ssf(tab) {
    const doc = new GoogleSpreadsheet(
      "16n4UlzdUCXEJ3kF3AquHobkjN7OKbGSojVYv9AYUo84"
    );
    let thesheet = 0;
    try {
      await doc.useServiceAccountAuth({
        client_email:
          "sheets-service@jessed-mofo-service-account.iam.gserviceaccount.com",
        private_key:
          "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDaUEy2MFSXya12\nemaO6SFKt5LFZfUAL7UYnxDa13pgeLPNtjImRTSR3sU3cg69VIek3HjDn4AgS+Zg\n4t/oLuGOeDkVVcYJrBVQ9e4mcZrg/PxCl/k5RpD4bi0pqgQaVgJLzhkMThkXWeeY\nCZurZnd+CQCJlzxwhREzx3Z8DlHgJFRyLAsRXOXiPcVkrf4256bgz8Jj99XFtfN0\n0tO3aGGipzvrZUYpo2V8zWevM7BfWW5GEUegpCLvo+k2AogtTWX6Iw/hy3XR6UVP\n+q7xDYp8nNaiUISMEbbAfUvfAaaII4S3wjgE4t2KHpAyW0GH+wTO7WeU365lBVZh\n09Lr6HfhAgMBAAECggEAAkbxTzrYqF78kx5f41CNXe26we+C5fOEGyOORd4WrcVs\niLIvD+T2ZqlxG1eHov7BTcf/7s3DL3MN44ennWYfHlY6MDMIFlySugNgA8t5DwI3\nMQxL7PFDvKz3hculxc7iW2nlAH1wYmTiwcb4i584ErA42XaNSpYqEa/HAwW/jGEy\nXCqMAWDSnsBozbk/7OX0ZT8TEkF266dY/78nuxU4PqQke5PTD9Z4wFrrovW2ioNF\nFc/9TzLy2Ay77C42g6l3UH+F/YTjJ1Ols7XTFtCVmWlROlE0ARau97swT4FW0dah\nA5vKM1vA2LthlviBxwtdsval13xaOcaEKdC1mwjQTQKBgQD3OmmbnMzhPywuQP7Q\n3CiBdYkuyJYq30uCN/cAET7ROhpts2jFMMQWnha+2yilFBo7UvQnqMhPtvkafv+O\ntidyGhD51JzoTaCTKRxZMGdYtepDkxg4l5WJWWZkGLwZyJZhp07vP/HLIyMolh6D\njAKHqkLykyGAP+lfxys4fDAxBQKBgQDiD0FLYCeItogRHPxchFRd7I0E5L0ClOy1\nzDu81yV6XXtwSyhsgFWFrH9snDyqJvXSxEYOM95uM40Tl4jIw+V0T1tl9aJlHZ8Z\nsPRRdL+hSMXfEC6YbjBSEqzoM4Gg55ROwqDbbEv3eacds9tXojmPZsJvdtNKlw2R\nbZxOQn+SLQKBgQCv1TCVR3ED5p0yjHFu9JYudPzLdEgxV7zpcYpP1vQZdLylNwuV\n67ga6fb9aPvAZMq/VKFnr4hAAb+rk5WI1464fUeDmC68nbFN2NhbqqxmEIP76Zs5\nbL4jAJ1tJZZqtBoYfBkM2irLMkNoM1SidKq7+GFDC1exUkNWJl5b/x97TQKBgQCj\nY3NGD5GDdqqR8+lS1TJFUJv8VXdnTkxoed0TeE1WTArT9v6YrYkivLK8xY/zS4WR\neNtJmKPD8u6cooHy2eQWVOUypH9jpi1AXG26EjAPWpHpz8Bd3AaAy469pbyjl73R\nz0qETZn6nKr1BPIcPNxtkVAnUDMXTmY4HolC5z1dYQKBgQClActGsi0m0ttwHej1\nIRZ/IurNm18maMOJWP0uP2ZCFeGXPLguqpVNidB9eDMC9VqkaGDWAIty2u1Gstqj\nD7xT/111bE+2nFR0wofAf0R/pIWn1bgGHDe7xpEMXGadhUbP0IGDLvaI+wNhErvA\nI3+QwwasWxxFAVzDa+mzBXIaSw==\n-----END PRIVATE KEY-----\n",
      });
      // loads document properties and worksheets
      await doc.loadInfo();
      thesheet = await doc.sheetsByTitle[tab];
      await this.setState({ sheet: thesheet});
      //const result = await sheet.addRow(row);
    } catch (e) {
      console.error("Error: ", e);
    }
    const rows = await thesheet.getRows();
    await this.setState({ rows: rows, cur_row: rows[this.state.case_num - 1] });
  }
  onClick = async (result) => {
    var old_num = this.state.case_num;
    console.log(result)
    var rows = await this.state.sheet.getRows();
    rows[this.state.case_num - 1].vote = result
    await rows[this.state.case_num - 1].save();
    this.setState({ case_num: old_num + 1 });
    this.setState({ cur_row: this.state.rows[old_num] });

    
    console.log(`Click received setting state to ${this.state.case_num} and ${this.state.cur_row}`)
  };
  handleSubmit = async (event) => {
    console.log(this.state.tab_name);
    event.preventDefault();
    this.ssf(this.state.tab_name);
  };

  handleChange = async (event) => {    this.setState({tab_name: event.target.value});  };

  render = () => {
    var id_a = "";
    var title_a = "";
    var description_a = "";
    var channel_a = "";
    var id_b = "";
    var title_b = "";
    var description_b = "";
    var channel_b = "";
    var comment = "";
    if (this.state.hasOwnProperty("cur_row") & typeof this.state.cur_row !== 'undefined') {
      id_a = this.state.cur_row.id_a;
      title_a = this.state.cur_row.title_a;
      description_a = this.state.cur_row.description_a;
      channel_a = this.state.cur_row.channel_a;
      id_b = this.state.cur_row.id_b;
      title_b = this.state.cur_row.title_b;
      description_b = this.state.cur_row.description_b;
      channel_b = this.state.cur_row.channel_b;
      comment = this.state.cur_row.comment;
    }
    return (
      <View
        style={[
          styles.container,
          {
            flexDirection: "column",
            //flex: 1,
          },
        ]}
      >
      <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></link>

        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              //flex: 1,
            },
          ]}
        >
          <View
            style={[
              styles.container,
              {
                flexDirection: "column",
                //flex: 1,
                //justifyContent: "space-around",
              },
            ]}
          >
            <Text>
              Video the user doesn't want recommendations similar to
            </Text>
            <Videoinfo name={title_a} channel={channel_a} description={description_a} id={id_a} />
            
          </View>
          <View
            style={[
              styles.container,
              {
                flexDirection: "column",
                justifyContent: "space-around",
                //flex: 1,
                //backgroundColor: "red",
              },

            ]}
          >
            <Text>
              Comment: {comment} {"\n"}{"\n"}
              Video link 1: <a href={"https://www.youtube.com/watch?v=" + id_a} target="_blank">https://www.youtube.com/watch?v={id_a}</a>{"\n"}
              Video link 2: <a href={"https://www.youtube.com/watch?v=" + id_b} target="_blank">https://www.youtube.com/watch?v={id_b}</a>{"\n"}
            </Text>
          </View>
          <View
            style={[
              styles.container,
              {
                flexDirection: "column",
                justifyContent: "space-around",
                //flex: 1,
                //backgroundColor: "red",
              },

            ]}
          >
            <Text>
              Video that was recommended to the user
            </Text>
            <Videoinfo name={title_b} channel={channel_b} description={description_b} id={id_b} />
          </View>
        </View>
        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
              justifyContent: "space-around",
              width: "60%",
              //flex: 1,
            },
          ]}
        >
          <Button
            onPress={() => {
              this.onClick(1);
            }}
            title="Acceptable Recommendation"
            color="#4169E1"
          ></Button>
          <Button
            onPress={() => {
              this.onClick(-1);
            }}
            title="Unsure"
            color="#4169E1"
          ></Button>
          <Button
            onPress={() => {
              this.onClick(0);
            }}
            title="Bad recommendation (too simlar to video user doesn't want)"
            color="#4169E1"
          ></Button>
        </View>
        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
              justifyContent: "space-around",
              width: "60%",
              flexGrow: 1,
            },
          ]}
        >
          <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  nameText: { fontSize: 50, padding: 15 },
});
