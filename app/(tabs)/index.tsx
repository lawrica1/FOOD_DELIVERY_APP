import "../globals.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, View, Text, Pressable, Image, TouchableOpacity } from 'react-native';
import { images, offers } from '@/constants';
import React, { Fragment } from "react";
import cn from 'clsx';
import CartButton from "@/components/CartButton";
import useAuthStore from "@/store/auth.store";

// The unused 'Button' import has been removed to fix the warning
export default function Index() {
    const { user } = useAuthStore();

    console.log("USER", JSON.stringify(user, null, 2) );

    return (
            <SafeAreaView className='flex-1 bg-white'>

                <FlatList
                    data={offers}
                    renderItem={({ item, index }) => {
                        const isEven = index % 2 === 0;
                        return (
                            <View>
                                <Pressable className={cn("offer-card", isEven ? 'flex-row-reverse' : 'flex-row')}
                                           style={{ backgroundColor: item.color }}
                                           android_ripple={{ color: '#fffff22' }}
                                >
                                    {/* The 'pressed' parameter has been removed since it's not used */}
                                    <Fragment>
                                        <View className={"h-full w-1/2"}>
                                            <Image source={item.image} className={"size-full"} resizeMode="contain"></Image>
                                        </View>
                                        <View className={cn("offer-card__info", isEven ? 'pl-10' : 'pr-10')}>
                                            <Text className='h1-bold text-white leading-tight'>
                                                {item.title}
                                            </Text>
                                            <Image
                                                source={images.arrowRight}
                                                className='size-10'
                                                resizeMode='contain'
                                                tintColor='#fffff'
                                            />
                                        </View>
                                    </Fragment>
                                </Pressable>
                            </View>
                        );
                    }}
                    contentContainerClassName='pb-28 px-5'
                    ListHeaderComponent={() => (
                        <View className='flex-between flex-row w-full my-5 px-5'>
                            <View className='flext-start'>
                                <Text className='small-bold text-primary'> DELIVER TO</Text>
                                <TouchableOpacity className=' flex-center flex-row gap-x-1 mt-0.5'>
                                    <Text className='paragraph-bold text-dark-100'> Cameroon </Text>
                                    <Image source={images.arrowDown} className='size-3' resizeMode='contain' />
                                </TouchableOpacity>
                            </View>

                            <CartButton />
                        </View>
                    )}
                />
            </SafeAreaView>

    );
}