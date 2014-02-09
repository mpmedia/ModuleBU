package com.example.andoridmvp;

import org.xylem.*;

import android.app.Activity;
import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.os.Bundle;

public class MainActivity extends Activity {
	
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		initFragment(new PaneFrag01());
		

	}

	/**
	 * boilerplate:
	 */
	protected void initFragment(Fragment frag) {
		FragmentManager fragmentManager = getFragmentManager();
		FragmentTransaction fragmentTransaction = fragmentManager
				.beginTransaction();
		fragmentTransaction.replace(android.R.id.content, frag);
		fragmentTransaction.commit();
	}

}