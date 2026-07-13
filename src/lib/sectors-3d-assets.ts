import asphaltColorUrl from "@/assets/sectors/materials/asphalt/color.jpg?url";
import asphaltNormalUrl from "@/assets/sectors/materials/asphalt/normal-gl.jpg?url";
import asphaltRoughnessUrl from "@/assets/sectors/materials/asphalt/roughness.jpg?url";
import concreteColorUrl from "@/assets/sectors/materials/concrete/color.jpg?url";
import concreteNormalUrl from "@/assets/sectors/materials/concrete/normal-gl.jpg?url";
import concreteRoughnessUrl from "@/assets/sectors/materials/concrete/roughness.jpg?url";
import qwantaniNoonUrl from "@/assets/sectors/hdr/qwantani-noon-puresky-1k.hdr?url";
import sandAoUrl from "@/assets/sectors/materials/sand/ao.jpg?url";
import sandColorUrl from "@/assets/sectors/materials/sand/color.jpg?url";
import sandNormalUrl from "@/assets/sectors/materials/sand/normal-gl.jpg?url";
import sandRoughnessUrl from "@/assets/sectors/materials/sand/roughness.jpg?url";
import energyBarrelUrl from "@/assets/sectors/models/energy-barrel.glb?url";
import hospitalWheelchairUrl from "@/assets/sectors/models/hospital-wheelchair.glb?url";
import hotelTableUrl from "@/assets/sectors/models/hotel-table.glb?url";
import schoolDeskUrl from "@/assets/sectors/models/school-desk.glb?url";
import alMullaLogoUrl from "@/assets/logo.png?url";

export const sector3DAssets = {
  brandMark: alMullaLogoUrl,
  environment: qwantaniNoonUrl,
  materials: {
    asphalt: {
      color: asphaltColorUrl,
      normal: asphaltNormalUrl,
      roughness: asphaltRoughnessUrl,
    },
    concrete: {
      color: concreteColorUrl,
      normal: concreteNormalUrl,
      roughness: concreteRoughnessUrl,
    },
    sand: {
      ao: sandAoUrl,
      color: sandColorUrl,
      normal: sandNormalUrl,
      roughness: sandRoughnessUrl,
    },
  },
  models: {
    energy: energyBarrelUrl,
    hospital: hospitalWheelchairUrl,
    hotel: hotelTableUrl,
    school: schoolDeskUrl,
  },
} as const;
