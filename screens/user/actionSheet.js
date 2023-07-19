// Using the provided hook
import { useActionSheet } from '@expo/react-native-action-sheet';
import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function Menu(props) {
    const { showActionSheetWithOptions } = useActionSheet();

    const onPress = () => {
        const options = ['ReportUser', 'Report Post', 'Cancel'];

        const cancelButtonIndex = 2;

        showActionSheetWithOptions({
            options,
            cancelButtonIndex,
        }, (selectedIndex) => {
            switch (selectedIndex) {
                case 1:
                    props.reportedAction('ReportPostScreen')
                    break;

                case 0:
                    props.reportedAction('ReportUserScreen')
                    break;

                case cancelButtonIndex:
                // Canceled
            }});
    }

    return (
        <TouchableOpacity title="Menu" onPress={onPress}>
            <Ionicons name={'ellipsis-vertical-outline'} size={20} color={'black'}/>
        </TouchableOpacity>
    )
};
