package com.mranderson.locationsample.location;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class LocationModule extends ReactContextBaseJavaModule implements JSEventSender {

    // private static final String TAG = LocationModule.class.getSimpleName();

    private static final String MODULE_NAME = "LocationManager";
    private static final String CONST_JS_LOCATION_EVENT_NAME = "JS_LOCATION_EVENT_NAME";
    private static final String CONST_JS_LOCATION_LAT = "JS_LOCATION_LAT_KEY";
    private static final String CONST_JS_LOCATION_LON = "JS_LOCATION_LON_KEY";
    private static final String CONST_JS_LOCATION_TIME = "JS_LOCATION_TIME_KEY";
    public static final String JS_LOCATION_LAT_KEY = "latitude";
    public static final String JS_LOCATION_LON_KEY = "longitude";
    public static final String JS_LOCATION_TIME_KEY = "timestamp";
    public static final String JS_LOCATION_EVENT_NAME = "location_received";

    private Context mContext;
    private BroadcastReceiver mEventReceiver;

    private Gson mGson;

    LocationModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        mGson = new Gson();
        createEventReceiver();
        registerEventReceiver();
    }


    @ReactMethod
    @SuppressWarnings("unused")
    public void startBackgroundLocation() {
        Intent eventIntent = new Intent("LocationUpdatesService.startStopLocation");
        eventIntent.putExtra("StartStopLocation", "START");
        getReactApplicationContext().sendBroadcast(eventIntent);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void stopBackgroundLocation() {
        Intent eventIntent = new Intent("LocationUpdatesService.startStopLocation");
        eventIntent.putExtra("StartStopLocation", "STOP");
        getReactApplicationContext().sendBroadcast(eventIntent);
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(CONST_JS_LOCATION_EVENT_NAME, JS_LOCATION_EVENT_NAME);
        constants.put(CONST_JS_LOCATION_LAT, JS_LOCATION_LAT_KEY);
        constants.put(CONST_JS_LOCATION_LON, JS_LOCATION_LON_KEY);
        constants.put(CONST_JS_LOCATION_TIME, JS_LOCATION_TIME_KEY);
        return constants;
    }

    @Nonnull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    public void createEventReceiver() {
        mEventReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                LocationCoordinates locationCoordinates = mGson.fromJson(
                        intent.getStringExtra(LocationUpdatesService.LOCATION_EVENT_DATA_NAME),
                        LocationCoordinates.class);

                WritableMap eventData = Arguments.createMap();
                eventData.putDouble(JS_LOCATION_LAT_KEY, locationCoordinates.getLatitude());
                eventData.putDouble(JS_LOCATION_LON_KEY, locationCoordinates.getLongitude());
                eventData.putDouble(JS_LOCATION_TIME_KEY, locationCoordinates.getTimestamp());

                // if you actually want to send events to JS side, it needs to be in the "Module"
                sendEventToJS(getReactApplicationContext(), JS_LOCATION_EVENT_NAME, eventData);
            }
        };
    }

    public void registerEventReceiver() {
        IntentFilter eventFilter = new IntentFilter();
        eventFilter.addAction(LocationUpdatesService.LOCATION_EVENT_NAME);
        mContext.registerReceiver(mEventReceiver, eventFilter);
    }

    @Override
    public void sendEventToJS(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }

}