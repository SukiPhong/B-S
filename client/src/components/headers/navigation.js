import { postRentTypes, postSoldTypes } from "@/lib/contants"
import { pathnames } from "@/lib/pathname"


const navigations = [
    {
        id: 1,
        name: 'Nhà đất bán',
        pathname: pathnames.public.soldProperty,
        hasSub: true,
        subs: postSoldTypes
    },
    {
        id: 2,
        name: 'Nhà đất cho thuê',
        pathname: pathnames.public.rentProperty,
        hasSub: true,
        subs: postRentTypes
    },
    {
        id: 3,
        name: 'Tin tức',
        pathname: pathnames.public.news,
        hasSub: false,

    },

]
export default navigations