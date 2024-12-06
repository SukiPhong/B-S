
import { useState ,useEffect} from 'react';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import PropTypes from "prop-types";
import { apiGetDistrictsById, apiGetWardsById } from '@/apis/external';
import userExternal from '@/zustand/userExternal';


const Address = ({ onAddressSelect }) => {
    const [districtsData, setDistrictsData] = useState([])
    const [wardsData, setWardsData] = useState([])
    const [toggleButton, setToggleButton] = useState(false)
    const [address, setAddress] = useState({
      province: "",
      district: "",
      ward: "",
      street: ""
    })
    const {provinces,} = userExternal()

    const handleProvinceChange = async (Pid) => {
      const selectedProvince = provinces.find(p => p.idProvince === Pid)
      setAddress({ province: selectedProvince.name, district: "", ward: "", street: "" })
      const   response =await  apiGetDistrictsById(Pid)
      if(response.status ===200) setDistrictsData(response.data)
     
    }
  
    const handleDistrictChange = async (did) => {
      const selectedDistrict = districtsData.find(d => d.idDistrict === did)
      setAddress(prev => ({ ...prev, district: selectedDistrict.name, ward: "", street: "" }))
      const response =await apiGetWardsById(did)
      if(response.status ===200)  setWardsData(response.data)
    }
  
    const handleWardChange = (value) => {
      const selectedWard = wardsData.find(w => w.idCommune === value)
      setAddress(prev => ({ ...prev, ward: selectedWard.name }))
    }
    
     useEffect(() => {
      if( address.province && address.district && address.ward)
        setToggleButton(true)
     
     }, [address.ward])
     
    const handleConfirm = (e) => {
      e.preventDefault(); 
      if (!address.province || !address.district || !address.ward)  return 
      const fullAddress = [
        address?.street,
        address?.ward,
        address?.district,
        address?.province
      ].filter(Boolean).join(", ")
      
      onAddressSelect({ ...address, fullAddress })
    }
  
    return (
      <div className="space-y-4   bg-slate-100 p-2 rounded-md border-[1px] border-main "  >
        <div className="space-y-2">
          <Label htmlFor="province">Tỉnh/Thành</Label>
          <Select onValueChange={handleProvinceChange}>
            <SelectTrigger id="province">
              <SelectValue placeholder="Chọn tỉnh/thành" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((e) => (
                <SelectItem key={e.idProvince
                } value={e.
                  idProvince}>{e.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
  
        <div className="space-y-2">
          <Label htmlFor="district">Quận/Huyện</Label>
          <Select 
            onValueChange={handleDistrictChange}
            disabled={!address.province}
          >
            <SelectTrigger id="district">
              <SelectValue placeholder="Chọn quận/huyện" />
            </SelectTrigger>
            <SelectContent>
              {districtsData.map((e) => (
                <SelectItem key={e.idDistrict} value={e.idDistrict}>{e.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
  
        <div className="space-y-2">
          <Label htmlFor="ward">Phường/Xã</Label>
          <Select 
            onValueChange={handleWardChange}
            disabled={!address.district}
          >
            <SelectTrigger id="ward">
              <SelectValue placeholder="Chọn phường/xã" />
            </SelectTrigger>
            <SelectContent>
              {wardsData.map((e) => (
                <SelectItem key={e.idCommune} value={e.idCommune}>{e.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
  
        <div className="space-y-2">
          <Label htmlFor="street">Số nhà, tên đường</Label>
          <Input
            id="street"
            value={address.street}
            disabled={!address.ward}
            onChange={(e) => setAddress(prev => ({ ...prev, street: e.target.value }))}
            placeholder="Nhập số nhà, tên đường"
          />
        </div>
  
       <div className='w-full   flex'>
       <Button onClick={handleConfirm} className="flex w-[80px] ml-auto justify-end" variant={toggleButton ? "default" :"unClick"}>Tiếp tục</Button>
       </div>
       
      </div>
     
    )
    
  }

export default Address
Address.propTypes = {
  onAddressSelect: PropTypes.func
};
