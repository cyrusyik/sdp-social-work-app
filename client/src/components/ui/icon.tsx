import * as OutlineIcons from 'react-native-heroicons/outline';
import * as SolidIcons from 'react-native-heroicons/solid';
import * as MiniIcons from 'react-native-heroicons/mini';
import * as MicroIcons from 'react-native-heroicons/micro';

const AllIcons = { ...OutlineIcons, ...SolidIcons, ...MiniIcons, ...MicroIcons };

export type IconName = keyof typeof AllIcons;

interface IconProps {
  name: IconName;
  variant?: 'outline' | 'solid' | 'mini' | 'micro';
  size?: number;
  color?: string;
}

export const Icon = ({ 
  name, 
  variant = 'outline', 
  size = 24, 
  color = '#000000' 
}: IconProps) => {
  // Select the appropriate icon set based on style variation
  const SelectedIconSet = variant === 'mini' ? MiniIcons : variant === 'outline' ? OutlineIcons : variant === 'micro' ? MicroIcons : SolidIcons;
  
  // Resolve the specific icon component
  const IconComponent = SelectedIconSet[name as keyof typeof SelectedIconSet];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in variant "${variant}".`);
    return null;
  }

  return <IconComponent size={size} color={color} />;
};

//<Icon name="UserIcon" variant="solid" color="#10B981" size={28} />