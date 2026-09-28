import { asset } from '../utils/asset';

export interface FamilyPhoto {
  id: string;
  image: string;
}

export const familyMembers: FamilyPhoto[] = [
  { id: 'family-1', image: asset('/images/family/fam1.jpg') },
  { id: 'family-2', image: asset('/images/family/fam2.png') },
  { id: 'family-3', image: asset('/images/family/fam3.jpg') },
  { id: 'family-4', image: asset('/images/family/mom.png') },
  { id: 'family-5', image: asset('/images/family/bro.png') },
  { id: 'family-6', image: asset('/images/family/grand.png') },
  { id: 'family-7', image: asset('/images/family/m2.jpg') },
  { id: 'family-8', image: asset('/images/family/m.png') },
  { id: 'family-9', image: asset('/images/family/sis.png') },
  { id: 'family-10', image: asset('/images/family/fa.jpg') },
];

