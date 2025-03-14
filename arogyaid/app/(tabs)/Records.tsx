import { useState,useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, TextInput,Dimensions,Platform } from 'react-native';
import QrIcon from '../../assets/images/qrIcon';
import BellIcon from '../../assets/images/bellIcon';
import MicIcon from '../../assets/images/micIcon';
// import RNPickerSelect from 'react-native-picker-select';
import SearchIcon from '../../assets/images/searchIcon';
import OptionsIcon from '../../assets/images/optionsIcon';
import DoctorIcon from '../../assets/images/doctorIcon';
import MedicalIcon from '../../assets/images/medicalIcon';
import DownwardArrowIcon from '../../assets/images/downwardArrow';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


const screenWidth = Dimensions.get("window").width;

const categoryIcons = {
  Imaging: require('../../assets/images/imagingIcon').default,
  Outpatient: require('../../assets/images/outpatientIcon').default,
  Labs: require('../../assets/images/labsIcon').default,
  'Genetic Testing': require('../../assets/images/geneticTestingIcon').default,
  Pathology: require('../../assets/images/pathologyIcon').default,
  Procedure: require('../../assets/images/procedureIcon').default,
  Hospitalization: require('../../assets/images/hospitalizationIcon').default,
};
const categoryColors = {
  "Imaging": "#FF6347", // Tomato
  "Outpatient": "#32CD32", // Lime Green
  "Labs": "#FFD700", // Gold
  "Genetic Testing": "#FF69B4", // Hot Pink
  "Pathology": "#6A5ACD", // Slate Blue
  "Procedure": "#20B2AA", // Light Sea Green
  "Hospitalization": "#FFA500", // Orange
};

const processRecords = (records) => {
  const processedRecords = [];
  const uniqueDoctors = new Set();
  const uniqueTypes = new Set();
  const uniqueDiseases = new Set();

  records.forEach((record) => {
    const [date, year] = record.date.split(', ');
    const formattedRecord = { ...record, date };

    const yearGroup = processedRecords.find((group) => group.year === year);
    if (yearGroup) {
      yearGroup.subRecords.push(formattedRecord);
    } else {
      processedRecords.push({ year, subRecords: [formattedRecord] });
    }

    if (record.dynamicFields?.doctor) {
      uniqueDoctors.add(record.dynamicFields.doctor);
    }

    if (record.type) {
      uniqueTypes.add(record.type);
    }

    if (record.dynamicFields?.problemList) {
      record.dynamicFields.problemList.forEach((disease) =>
        uniqueDiseases.add(disease)
      );
    }
  });

  return {
    processedRecords,
    uniqueDoctors: Array.from(uniqueDoctors),
    uniqueTypes: Array.from(uniqueTypes),
    uniqueDiseases: Array.from(uniqueDiseases),
  };
};


// const records = [
//   {
//     year: '2023',
//     subRecords: [
//       {
//         date: 'Dec 5th',
//         title: 'MRI : Brain',
//         type: 'Imaging',
//         doctor: 'Dr. Surabhi Anand',
//         Description: 'The patient presented with occasional headaches and dizziness',
//         Findings: 'This MRI of the brain reveals no significant abnormalities.',
//       },
//       {
//         date: 'Nov 25th',
//         title: 'Thyroid Profile',
//         type: 'Labs',
//         Results: [
//           { label: 'Basophils', value: '10*3/uL' },
//           { label: 'BUN/Creatine Blood', value: '29' },
//           { label: 'Calcium (Blood)', value: '10.1 mg/dL' },
//         ],
//       },
//       {
//         date: 'Nov 15th',
//         title: 'Prescription',
//         type: 'Outpatient',
//         doctor: 'Dr. Surabhi Anand',
//         "Problem List": ['Atrial fibrillation', 'Chest pain', 'Partial colectomy'],
//       },
//     ],
//   },
// ];


export default function MedicalRecordsScreen() {
  const [searchText, setSearchText] = useState('');
  const [records,setRecords] = useState([]);
  const [doctors,setDoctors] = useState([]);
  const [selectedDoctor,setselectedDoctor] = useState([]);
  const [diseases,setDiseases] = useState([]);
  const [selectedDisease,setselectedDisease] = useState([]);
  const [recordTypes,setRecordTypes] = useState([]);
  const [selectedRecordType,setSelectedRecordType] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [currentKey, setCurrentkey] = useState(false);
  const [currentVal, setCurrentVal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  

  const dropDownData = {
    "Record Type":recordTypes,
    "Doctors" : doctors,
    "Diseases": diseases
  }
  

  useEffect(()=>{
    const fetchRecords = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://arogyaid-take-home.onrender.com/records');
        const processedRecords = processRecords(response.data);
        setRecords(processedRecords.processedRecords);
        setFilteredRecords(processedRecords.processedRecords);
        setDoctors(processedRecords.uniqueDoctors);
        setRecordTypes(processedRecords.uniqueTypes);
        setDiseases(processedRecords.uniqueDiseases);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchRecords();

  },[])

  const updateFilters = (key,value) =>{
    if (key === 'Doctors'){
      setselectedDoctor(value);
    }
    else if (key === 'Diseases'){
      setselectedDisease(value);
    }
    else {
      setSelectedRecordType(value);
    }
    applyFilters(key,value);
    // setShowFilter(false);
    

  }

  const applyFilters = (key,value) => {
    
    setFilteredRecords(() => {
      const updatedRecords = records.map((item) => {
        const filteredSubRecords = item.subRecords.filter((subItem) => {
          const matchType =
            selectedRecordType.length === 0 || subItem.type === selectedRecordType;
  
          const matchDoctor =
            selectedDoctor.length === 0 ||
            (subItem.dynamicFields?.doctor &&
              subItem.dynamicFields.doctor === selectedDoctor);
  
          const matchDisease =
            selectedDisease.length === 0 ||
            (subItem.dynamicFields?.problemList &&
              subItem.dynamicFields.problemList.includes(selectedDisease));
  
          return matchType && matchDoctor && matchDisease;
        });
  
        return { ...item, subRecords: filteredSubRecords };
      }).filter((item) => item.subRecords.length > 0);
  
      console.log("Updated Records: ", updatedRecords); 
      return updatedRecords;
    });
  
    setShowFilter(false);
  };
  
  
  
  
  

  const renderDropdown = () => (
    <View style={{width:`${screenWidth-60}`,height:`${screenWidth-30}`}} className='z-50 absolute left-8 top-1/4 bg-white border border-gray-300 shadow-2xl shadow-black rounded-2xl p-4'>
      <View className='justify-right flex-row justify-between'>
      <Text className='font-bold mb-4 text-2xl text-gray-800'>{currentKey}</Text>

        <TouchableOpacity className='rounded-full w-10 h-10 bg-red-400 items-center justify-center' onPress={()=>{setShowFilter(false)}}>
          <Text className='text-white text-center text-lg'>X</Text>
        </TouchableOpacity>
      </View>
      {currentVal.map((value) => (
        <TouchableOpacity
          key={value}
          className='border-b border-gray-200 last:border-b-0 px-4 py-3 hover:bg-gray-100 rounded-lg'
          onPress={() => updateFilters(currentKey, value)}
        >
          <Text className='text-lg text-gray-700'>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const getSelectedLabel = (key) => {
    switch (key) {
      case "Doctors":
        return selectedDoctor.length > 0 ? selectedDoctor : "Doctors";
      case "Diseases":
        return selectedDisease.length > 0 ? selectedDisease : "Diseases";
      case "Record Type":
        return selectedRecordType.length > 0 ? selectedRecordType : "Record Type";
      default:
        return key;
    }
  };

  const resetFilters = () =>{
    applyFilters();
    setSelectedRecordType('');
    setselectedDoctor('');
    setselectedDisease('');
    
  }
  
  const downloadFile = async (recordId: string) => {
    try {
      const fileUri = `${FileSystem.documentDirectory}${recordId}.pdf`;
  
      const response = await axios.get(`https://arogyaid-take-home.onrender.com/records/${recordId}/download`, {
        responseType: 'blob',
      });
  
      const base64 = await blobToBase64(response.data);
  
      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        console.log('File saved at:', fileUri);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result?.toString().split(',')[1] || '');
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <View className="flex-1 bg-white pt-4">

      <View className="flex-row justify-between pl-4 pr-4">
        <TouchableOpacity className="items-center justify-center">
          <QrIcon />
        </TouchableOpacity>

        <View className="rounded-2xl shadow-2xl shadow-black bg-white flex-row w-[75%] h-12 justify-center items-center">
          <TouchableOpacity className="items-center justify-center">
            <SearchIcon />
          </TouchableOpacity>

          <TextInput
            placeholder="search"
            value={searchText}
            onChangeText={setSearchText}
            className="w-[75%] p-2"
            placeholderTextColor="black"
          />

          <TouchableOpacity className="items-center justify-center">
            <MicIcon />
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="items-center justify-center">
          <BellIcon />
        </TouchableOpacity>
      </View>

    <View className='my-4 mx-2'>
    <View className="flex-row justify-between  p-1">
  {/* {Object.entries(dropDownData).map(([key, value]) => (
    <TouchableOpacity
      key={key}
      className="rounded-full flex-row items-center border border-black p-4"
      onPress={() => {
        setCurrentkey(key);
        setCurrentVal(value);
        setShowFilter(true);
      }}
    >
      
      <Text className="mr-1">{getSelectedLabel(key).slice(0,12)}</Text>
      
      <DownwardArrowIcon />
    </TouchableOpacity>
  ))} */}
  
</View>
{
  selectedDisease.length + selectedDoctor.length + selectedRecordType.length > 0 && (
    <TouchableOpacity className='' onPress={()=>{resetFilters()}}>
      <Text className='text-right mr-2 text-blue-500'>reset filters</Text>
    </TouchableOpacity>
  )
}
    </View>

      {showFilter && renderDropdown()}

      <View className="flex-row items-center justify-between p-4">
        <Text className="text-2xl font-bold">Records</Text>
      </View>

      {
        records.length>0?(<ScrollView className="px-4">
          {filteredRecords.map((record, index) => (
            <View key={index} className="mb-6 relative">
              <View className="absolute left-8 top-8 bg-blue-500 rounded-lg w-1 h-[90%] z-[-50]" />
  
              <Text className="text-lg p-2 rounded-full border border-black my-2 w-20 text-center z-10 bg-white">
                {record.year}
              </Text>
  
              {record.subRecords.map((item, subindex) => {
                const Icon = categoryIcons[item.type];
                const color = categoryColors[item.type]
                return (
                  <View key={subindex} className="mt-4 rounded-xl">
                    
                    
                    <Text className="text-gray-500 mb-2 bg-white p-2">{item.date}</Text>
                    <View className="justify-between bg-white shadow-lg shadow-gray-400 rounded-xl  ">
  
                    <View className='flex-row justify-between'>
                    <View className='pl-0 pt-3 border-b border-stone-200 ml-4'>
                    <Text className="text-lg font-semibold mb-1 text-left">{item.title}</Text>
                    </View>
                    <View style= {{backgroundColor:`${color}`}} className='rounded-bl-xl rounded-tr-xl flex-row p-2'>
                        {Icon && <Icon />}
                        <Text className="text-lg font-semibold mb-1 ml-2">{item.type}</Text>
                          <TouchableOpacity>
                          <OptionsIcon/>
                          </TouchableOpacity>
                        </View>
                    </View>
  
                    <View className='flex-row justify-between p-2 pl-0 ml-4'>
                    
                    <View className='flex-row '>
                    <MedicalIcon/>
                      <Text className='font-light'>Lorem ipsum dolor sit.</Text>
                      </View>
                          
                          {item.dynamicFields.doctor?(<View className='flex-row'>
                            <DoctorIcon/>
                            <Text className='font-light'>{item.dynamicFields.doctor}</Text>
  
                          </View>):(<></>)}
                      
                    </View>
                      <View className='flex-row p-4 justify-between'>
                      <View className="flex-1 max-w-[60%]">
                        
                        
          {Object.entries(item.dynamicFields).map(([key, value]) => {
            if ( key === 'doctor') return null; 
            
            if (Array.isArray(value)) {
              return (
                <View key={key}>
                  <Text className="text-stone-900 font-bold text-lg">{key} :</Text>
                  {value.map((v, i) =>
                    typeof v === 'object' ? (
                      <View key={i}>
                        <Text  className="text-stone-900 font-semibold">{`${v.label} `}</Text>
                        <Text  className="text-gray-600 font-light">{`${v.value}`}</Text>
                      </View>
                      
                    ) : (
                      <Text key={i} className="text-gray-600 font-light">- {v}</Text>
                    )
                  )}
                </View>
              );
            }
  
            return (
              
              <View key={key} className=''>
                <Text  className="text-stone-900 font-bold text-lg ">{`${key} :`}</Text>
                <Text  className="text-gray-600 font-light">{`${value}`}</Text>
              </View>
            );
          })}
                      </View>
  
                      <View  className="items-right ml-1 bg-gray-200 rounded-lg">
                        
                        
                                    <Image 
                source={{ uri: item.thumbnail }} 
                style={{ width: 150, height: 150 }} 
                alt={item.title}
                />
                      <TouchableOpacity className="mt-4" onPress={()=>{downloadFile(item._id)}}>
                        <Text className="text-blue-500 text-center font-bold text-m">View Report</Text>
                      </TouchableOpacity>
                      </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          ))}
        </ScrollView>):(<></>)
      }

      {isLoading?(<Text className='h-[90%] text-center justify-center items-center'>Loading...</Text>):(<></>)}
    </View>
  );
}
